import { DoctorModel, IDoctor } from "@/models";
import { injectable } from "inversify";
import { BaseRepository, IDoctorRepository } from "@/repositories";
import { CreateUserDto, FilterDoctorRepoResponse } from "@/dtos";
import { FilterQuery, UpdateQuery } from "mongoose";
import { GetDoctorOptions, IPagination } from "@/interfaces";
import { BadRequestError } from "@/errors";

@injectable()
export class DoctorRepository
  extends BaseRepository<IDoctor>
  implements IDoctorRepository
{
  constructor() {
    super(DoctorModel);
  }

  async findByEmail(email: string): Promise<IDoctor | null> {
    return await this.model.findOne({ "personal.email": email });
  }

  async findBasicInfoById(
    doctorId: string
  ): Promise<{ name: string; specialization: string }> {
    const doctor = await this.model
      .findById(doctorId, {
        "personal.fullName": 1,
        "professional.specialization": 1,
      })
      .lean();

    if (!doctor) {
      throw new BadRequestError("Doctor not found");
    }

    return {
      name: doctor.personal.fullName,
      specialization: doctor.professional.specialization,
    };
  }

  async register(data: CreateUserDto): Promise<Partial<IDoctor>> {
    const doctor = {
      personal: data,
    };
    return await this.model.create(doctor);
  }

  async updateImage(
    doctorId: string,
    imageUrl: string
  ): Promise<IDoctor | null> {
    const updatedDoctor = await this.model.findByIdAndUpdate(
      doctorId,
      { "personal.profileImage": imageUrl },
      { new: true }
    );
    return updatedDoctor;
  }

  async updateStatus(
    doctorId: string,
    update: UpdateQuery<IDoctor["status"]>
  ): Promise<IDoctor | null> {
    return this.model
      .findByIdAndUpdate(doctorId, { $set: update }, { new: true })
      .exec();
  }

  async getDoctorsSummaryByReviewStatus(
    status: string,
    { skip = 0, limit = 6 }: IPagination
  ): Promise<{ total: number; doctors: IDoctor[] }> {
    const filter = { "status.profile.reviewStatus": status };
    const total = await this.model.countDocuments(filter);
    const doctors = await this.model
      .find(filter, {
        "personal.fullName": 1,
        "personal.profileImage": 1,
        "professional.specialization": 1,
        rating: 1,
        "professional.fees": 1,
      })
      .skip(skip)
      .limit(limit)
      .lean();

    return { total, doctors };
  }

  async filterDoctorForAdmin(
    options: GetDoctorOptions,
    { skip = 0, limit = 6 }: IPagination
  ): Promise<{ data: Partial<FilterDoctorRepoResponse>[]; total: number }> {
    const { sortField, sortOrder } = options;

    const query = this.convertToQuery(options);

    const [data, total] = await Promise.all([
      DoctorModel.find(query)
        .select({
          _id: 1,
          "personal.fullName": 1,
          "professional.yearsOfExperience": 1,
          "professional.specialization": 1,
          "personal.profileImage": 1,
          "personal.languageSpoken": 1,
          "status.profile.reviewStatus": 1,
          "status.accountStatus.isBlocked": 1,
          "status.verification.isVerified": 1,
          rating: 1,
        })
        .sort({ [sortField || "createdAt"]: sortOrder === "asc" ? 1 : -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      DoctorModel.countDocuments(query),
    ]);

    return {
      data,
      total,
    };
  }

  async PublicDoctorCardDetails(
    options: GetDoctorOptions,
    { skip = 0, limit = 6 }: IPagination
  ): Promise<{ data: Partial<FilterDoctorRepoResponse>[]; total: number }> {
    const { sortField, sortOrder } = options;

    const query = this.convertToQuery({
      ...options,
      filters: {
        ...options.filters,
        profileStatus: "approved",
        accountStatus: "unblocked",
      },
    });

    const [data, total] = await Promise.all([
      DoctorModel.find(query)
        .select({
          _id: 1,
          "personal.fullName": 1,
          "personal.gender": 1,
          "professional.yearsOfExperience": 1,
          "professional.specialization": 1,
          "personal.profileImage": 1,
          "personal.languageSpoken": 1,
          "status.profile.reviewStatus": 1,
          "status.accountStatus.isBlocked": 1,
          "status.verification.isVerified": 1,
          rating: 1,
        })
        .sort({ [sortField || "createdAt"]: sortOrder === "asc" ? 1 : -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      DoctorModel.countDocuments(query),
    ]);

    return {
      data,
      total,
    };
  }

  private convertToQuery({ filters }: GetDoctorOptions): FilterQuery<IDoctor> {
    const query: FilterQuery<IDoctor> = {};

    const {
      searchQuery,
      language,
      profileStatus,
      accountStatus,
      experienceMin,
      experienceMax,
      specialization,
      ratingMin,
      ratingMax,
    } = filters;

    if (searchQuery) {
      query["personal.fullName"] = { $regex: searchQuery, $options: "i" };
    }

    if (language && language.length > 0) {
      query["personal.languageSpoken"] = { $in: language };
    }

    if (profileStatus) {
      query["status.profile.reviewStatus"] = profileStatus;
    }

    if (specialization) {
      query["professional.specialization"] = specialization;
    }

    if (accountStatus === "blocked") {
      query["status.accountStatus.isBlocked"] = true;
    } else if (accountStatus === "unblocked") {
      query["status.accountStatus.isBlocked"] = false;
    }

    if (experienceMin && !isNaN(experienceMin)) {
      query["professional.yearsOfExperience"] = {
        ...query["professional.yearsOfExperience"],
        $gte: experienceMin,
      };
    }
    if (experienceMax && !isNaN(experienceMax)) {
      query["professional.yearsOfExperience"] = {
        ...query["professional.yearsOfExperience"],
        $lte: experienceMax,
        ...query["professional.yearsOfExperience"],
      };
    }
    if (ratingMin && !isNaN(ratingMin)) {
      query["rating.average"] = {
        ...query["rating.average"],
        $gte: ratingMin,
      };
    }
    if (ratingMax && !isNaN(ratingMax)) {
      query["rating.average"] = {
        ...query["rating.average"],
        $lte: ratingMax,
      };
    }

    return query;
  }
}
