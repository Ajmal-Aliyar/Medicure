import React from 'react';
import { api } from '../../../../utils/axiosInstance';
import { useDispatch } from 'react-redux';
import { setError, setLoading, setSuccess } from '../../../../store/slices/commonSlices/notificationSlice';

const UploadReport = () => {
  const dispatch = useDispatch()

  const getFileType = (fileName: string): string => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    const typeMap: Record<string, string> = {
      pdf: 'PDF Report',
      jpg: 'Image Report',
      jpeg: 'Image Report',
      svg: 'Image Report',
      png: 'Image Report',
      doc: 'Word Document',
      docx: 'Word Document',
      xls: 'Excel Document',
      xlsx: 'Excel Document',
    };
    return typeMap[extension || ''] || 'Unknown Report';
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      dispatch(setLoading(true))
    const file = e.target.files?.[0];
    if (!file) return alert('Please upload a valid file');

    const testType = getFileType(file.name);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('testType', testType);



      await api.post('/api/report/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      dispatch(setSuccess('Report uploaded successfully'))
    } catch (error) {
      dispatch(setError('Upload report failed'))
    } finally {
      dispatch(setLoading(false))
    }
  };

  return (
    <div className='max-w-[180px] mt-1'>
      <label 
        htmlFor="picture" 
        className="cursor-pointer bg-[#51aff6ce] hover:bg-[#51aff6] text-white font-medium py-1 px-4 rounded-lg transition duration-300">
        Upload
      </label>

      <input
        id="picture"
        type="file"
        onChange={handleSubmit}
        className='opacity-0 absolute top-0'
      />
    </div>
  );
};

export default UploadReport;
