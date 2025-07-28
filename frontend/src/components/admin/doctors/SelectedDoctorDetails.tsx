import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { getDoctorDetailsApi } from '../../../sevices/admin/doctorRepository';
import { IDoctorType } from '../../../types/doctor/doctorType';
import {
  clearWarning,
  setError,
  setExtra,
  setSuccess,
  setWarning,
} from '../../../store/slices/commonSlices/notificationSlice';
import {
  blockRole,
  unblockRole,
} from '../../../sevices/admin/patientRepository';

const SelectedDoctorDetails: React.FC = () => {
  const { selectId } = useSelector((state: RootState) => state.manageDoctor);
  const [doctor, setDoctor] = useState<IDoctorType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        setLoading(true);
        const response = await getDoctorDetailsApi(selectId);
        setDoctor(response.data);
      } catch (error) {
        dispatch(setError('Failed to fetch doctor details.'));
      } finally {
        setLoading(false);
      }
    };

    if (selectId) fetchDoctor();
  }, [selectId, dispatch]);

  const handleAction = async (_id: string, isBlocked: boolean) => {
    const confirmFunction = async () => {
      try {
        const action = isBlocked ? unblockRole : blockRole;
        const response = await action(_id);

        if (response?.message) {
          dispatch(setSuccess(response.message));
          setDoctor((prev) =>
            prev ? { ...prev, status: { ...prev.status, accountStatus: { ...prev.status.accountStatus, isBlocked: !isBlocked } } } : prev
          );
        }
      } catch (error) {
        dispatch(setError('Something went wrong. Please try again later.'));
      } finally {
        dispatch(clearWarning());
      }
    };

    dispatch(
      setWarning(
        `Are you sure you want to ${isBlocked ? 'unblock' : 'block'} this doctor?`
      )
    );
    dispatch(setExtra(confirmFunction));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-gray-500">Loading doctor details...</span>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="flex justify-center items-center h-64 text-red-500">
        Doctor not found.
      </div>
    );
  }

  const { id, personal, professional, location, status } = doctor;
  const isBlocked = status.accountStatus.isBlocked;

  return (
    <div className="grid grid-cols-12 gap-4 w-full p-6 bg-[#fafafa] text-[#16423cc1]">
      <div className="col-span-12 flex flex-col md:flex-row gap-4 items-center">
        <div className="w-40 h-40 rounded-lg overflow-hidden shadow-md">
          <img
            src={personal.profileImage || ''}
            alt="Doctor Profile"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full bg-white rounded-lg shadow-md p-4 border">
          <div className="flex justify-between items-center border-b pb-2 mb-4">
            <h2 className="text-lg font-semibold">Professional Details</h2>
            <button
              className="relative group"
              onClick={() => handleAction(id, isBlocked)}
              aria-label={isBlocked ? 'Unblock doctor' : 'Block doctor'}
            >
              <div
                className={`relative flex items-center justify-between px-4 py-1.5 text-sm text-white rounded-md transition font-semibold ${
                  isBlocked
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {isBlocked ? 'Blocked' : 'Active'}
              </div>
            </button>
          </div>

          <div className="grid grid-cols-4 gap-y-2 text-sm text-gray-600">
            <p className="font-medium">Full Name</p>
            <p className="col-span-3">: {personal.fullName}</p>
            <p className="font-medium">Email</p>
            <p className="col-span-3">: {personal.email}</p>
            <p className="font-medium">Phone</p>
            <p className="col-span-3">: {personal.mobile}</p>
            <p className="font-medium">Language</p>
            <p className="col-span-3">: {personal.languageSpoken}</p>
          </div>
        </div>
      </div>

      <div className="col-span-12 bg-white rounded-lg shadow-md p-6 border">
        <h2 className="text-lg font-semibold mb-4 border-b pb-2">Profile Details</h2>
        <div className="grid grid-cols-4 gap-y-2 text-sm text-gray-600">
          <p className="font-medium">Headline</p>
          <p className="col-span-3">: {professional.headline}</p>
          <p className="font-medium">Category</p>
          <p className="col-span-3">: {professional.specialization}</p>
          <p className="font-medium">Bio</p>
          <p className="col-span-3">: {professional.about}</p>
        </div>
      </div>

      <div className="col-span-12 bg-white rounded-lg shadow-md p-6 border">
        <h3 className="text-lg font-semibold mb-4 border-b pb-2">Address</h3>
        <div className="grid grid-cols-4 gap-y-2 text-sm text-gray-600">
          <p className="font-medium">Line</p>
          <p className="col-span-3">: {location.addressLine}</p>
          <p className="font-medium">Street</p>
          <p className="col-span-3">: {location.street}</p>
          <p className="font-medium">City</p>
          <p className="col-span-3">: {location.city}</p>
          <p className="font-medium">State</p>
          <p className="col-span-3">: {location.state}</p>
          <p className="font-medium">Country</p>
          <p className="col-span-3">: {location.country}</p>
          <p className="font-medium">Pincode</p>
          <p className="col-span-3">: {location.pincode}</p>
        </div>
      </div>

    
    </div>
  );
};

export default SelectedDoctorDetails;
