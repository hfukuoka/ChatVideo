/* eslint-disable no-alert */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from 'react-query';
import { supabase } from '@/lib/supabase';
import { FileWithPath } from '@mantine/dropzone';
import { useUser } from '@supabase/auth-helpers-react';

export const useUploadVideo = () => {
  const user = useUser();
  const useMutateUploadVideo = useMutation(
    async (files: FileWithPath[]) => {
      if (!files || files.length === 0) {
        throw new Error('Please select the video file');
      }
      const file = files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;
      const { error } = await supabase.storage
        .from('videos')
        .upload(`${user?.id}/${filePath}`, file);
      if (error) throw new Error(error.message);
    },
    {
      onError: (err: any) => {
        alert(err.message);
      },
    }
  );

  return { useMutateUploadVideo };
};
