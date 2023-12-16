"use client"

import { useRouter } from "next/navigation";
import { User, getUser, updateUser } from "@/actions/user-actions";
import { DatePicker } from "@/components/homepage/profile-update/date-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";



const SettingPage = () => {
    const router = useRouter();
  const params = useParams();
  const [user, setUser] = useState<User | undefined>();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [updatedUserFirstName, setUpdatedUserFirstName] = useState<string>('');
  const [updatedUserLastName, setUpdatedUserLastName] = useState<string>('');
  const [updatedUserEmail, setUpdatedUserEmail] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>(''); // New state variable
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const getUserServer = async () => {
      const result = await getUser(params.UserID as string);
      setUser(result);
    };

    getUserServer();
  }, [params.UserID]);

  const handleCancel = () => {
    router.back();
  };

  const handleFormSubmit = async () => {
    try {
      const updatedUserData: Partial<User> = {
        UserFirstName: updatedUserFirstName || user?.UserFirstName || '',
        UserLastName: updatedUserLastName || user?.UserLastName || '',
        UserEmail: updatedUserEmail || user?.UserEmail || '',
        UserDOB: selectedDate,
      };

      if (newPassword || confirmNewPassword) {
        if (newPassword === confirmNewPassword) {
          updatedUserData.UserPass = newPassword;
        } else {
          setErrorMessage('Password mismatch');
          setSuccessMessage(''); // Clear success message
          return;
        }
      }

      const updatedUser = await updateUser(params.UserID as string, updatedUserData);

      if (updatedUser) {
        setUser(updatedUser);
        setSuccessMessage('Profile updated successfully');
        setErrorMessage('');
        console.log('User updated successfully:', updatedUser);
        toast.success("Completely updated.");
        router.refresh();
        router.back();
      } else {
        console.error('Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="w-full h-full flex justify-center ">
      <div className="w-full md:w-[70%] bg-white/90 h-full flex flex-col px-10 md:px-16 overflow-y-auto">
        <div className="pt-10 md:pt-14">
          <h1 className="font-semibold md:text-4xl text-3xl text-blue-800">Edit profile</h1>
        </div>
        <div className="flex flex-col gap-y-3 w-full md:grid md:grid-cols-2 pt-5">
          <div className="flex flex-col gap-y-3 md:pt-4 pt-1">
            <h1 className="text-lg pl-2 font-semibold text-slate-600">First Name:</h1>
            <Input
              className="md:w-[400px] w-full h-12 border-2 text-md"
              placeholder={user?.UserFirstName}
              value={updatedUserFirstName}
              onChange={(e) => setUpdatedUserFirstName(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-y-3 md:pt-4 pt-1">
            <h1 className="text-lg pl-2 font-semibold text-slate-600">Last Name:</h1>
            <Input
              className="md:w-[400px] w-full h-12 border-2 text-md"
              placeholder={user?.UserLastName}
              value={updatedUserLastName}
              onChange={(e) => setUpdatedUserLastName(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-y-3 md:pt-4 pt-1">
            <h1 className="text-lg pl-2 font-semibold text-slate-600">Date of birth:</h1>
            <div className="w-full md:w-[400px]">
              <DatePicker selectedDate={selectedDate} onChange={setSelectedDate} />
            </div>
          </div>

          <div className="flex flex-col gap-y-3 md:pt-4 pt-1 md:col-span-2">
            <h1 className="text-lg pl-2 font-semibold text-slate-600">New email:</h1>
            <Input
              className="md:w-[400px] w-full h-12 border-2 text-md"
              placeholder={user?.UserEmail}
              value={updatedUserEmail}
              onChange={(e) => setUpdatedUserEmail(e.target.value)}
              type="email"
            />
          </div>

          <div className="flex flex-col gap-y-3 md:pt-4 pt-1">
            <h1 className="text-lg pl-2 font-semibold text-slate-600">New password:</h1>
            <Input
              className="md:w-[400px] w-full h-12 border-2 text-md"
              placeholder="Type your new password..."
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              type="password"
            />
          </div>

          <div className="flex flex-col gap-y-3 md:pt-4 pt-1">
            <h1 className="text-lg pl-2 font-semibold text-slate-600">Confirm your new password:</h1>
            <Input
              className="md:w-[400px] w-full h-12 border-2 text-md"
              placeholder="Retype your new password..."
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              type="password"
            />
          </div>
        </div>
        <div className="flex flex-row gap-x-2 justify-end py-6">
        <Button variant="outline" onClick={() => handleCancel()}>
            Cancel
          </Button>
          <Button className="bg-blue-800" onClick={() => handleFormSubmit()}>
            Submit
          </Button>
        </div>
        {errorMessage && (
          <div className="text-red-600 font-semibold py-4 text-center">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="text-green-600 font-semibold py-4 text-center">
            {successMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingPage;