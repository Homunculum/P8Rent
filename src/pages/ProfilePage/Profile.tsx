import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { UserService } from '../../services/UsersService';
import { UsersModel } from '../../models/responses/UsersModel';
import './Profile.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile: React.FC = () => {
  const { id } = useContext(AuthContext);
  const [userData, setUserData] = useState<UsersModel | null>(null);
  const [emailEditMode, setEmailEditMode] = useState(false);
  const [phoneNumberEditMode, setPhoneNumberEditMode] = useState(false);
  const [passwordEditMode, setPasswordEditMode] = useState(false);
  const [nameEditMode, setNameEditMode] = useState(false);
  const [surnameEditMode, setSurnameEditMode] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [newName, setNewName] = useState('');
  const [newSurname, setNewSurname] = useState('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (id) {
      getUserData(id);
    }
  }, [id]);

  const getUserData = async (id: string) => {
    const response = await UserService.getUserById(id);
    setUserData(response.data);
  };

  const handleEmailChange = () => {
    setEmailEditMode(true);
    setNewEmail(userData!.email);
  };

  const handlePhoneNumberChange = () => {
    setPhoneNumberEditMode(true);
    setNewPhoneNumber(userData!.gsm);
  };

  const handlePasswordChange = () => {
    setPasswordEditMode(true);
  };

  const handleNameChange = () => {
    setNameEditMode(true);
    setNewName(userData!.name);
  };

  const handleSurnameChange = () => {
    setSurnameEditMode(true);
    setNewSurname(userData!.surname);
  };

  const handleEmailSave = async () => {
    try {
      await UserService.updateEmail(parseInt(id!), newEmail);
      setEmailEditMode(false);
      getUserData(id!);
      toast.success('Email updated successfully.', {
        position: "top-right",
        autoClose: 2000,
      });
    } catch (error:any) {
      console.error('Error updating email:', error);
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  const handlePhoneNumberSave = async () => {
    try {
      if (!newPhoneNumber) {
        throw new Error('Phone number cannot be empty.');
      }
      await UserService.updatePhoneNumber(parseInt(id!), newPhoneNumber);
      setPhoneNumberEditMode(false);
      getUserData(id!);
      toast.success('Phone number updated successfully.', {
        position: "top-right",
        autoClose: 2000,
      });
    } catch (error:any) {
      console.error('Error updating phone number:', error);
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  const handlePasswordSave = async () => {
    try {
      await UserService.updatePassword(parseInt(id!), newPassword, confirmNewPassword);
      setPasswordEditMode(false);
      setNewPassword('');
      setConfirmNewPassword('');
      toast.success('Password updated successfully.', {
        position: "top-right",
        autoClose: 2000,
      });
    } catch (error:any) {
      console.error('Error updating password:', error);
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  const handleNameSave = async () => {
    try {
      await UserService.updateName(parseInt(id!), newName);
      setNameEditMode(false);
      getUserData(id!);
      toast.success('Name updated successfully.', {
        position: "top-right",
        autoClose: 2000,
      });
    } catch (error:any) {
      console.error('Error updating name:', error);
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  const handleSurnameSave = async () => {
    try {
      await UserService.updateSurname(parseInt(id!), newSurname);
      setSurnameEditMode(false);
      getUserData(id!);
      toast.success('Surname updated successfully.', {
        position: "top-right",
        autoClose: 2000,
      });
    } catch (error:any) {
      console.error('Error updating surname:', error);
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="profile text-left justify-self-center">
      {userData ? (
        <div className='profiles'>
          <h2>Profile Page</h2>
          <div className='row'>
            <input
              type="text"
              value={nameEditMode ? newName : userData.name}
              onChange={(e) => setNewName(e.target.value)}
            />
            {nameEditMode ? (
              <button onClick={handleNameSave}>Save</button>
            ) : (
              <button onClick={handleNameChange}>Change</button>
            )}
          </div>
          <div className='row'>
            <input
              type="text"
              value={surnameEditMode ? newSurname : userData.surname}
              onChange={(e) => setNewSurname(e.target.value)}
            />
            {surnameEditMode ? (
              <button onClick={handleSurnameSave}>Save</button>
            ) : (
              <button onClick={handleSurnameChange}>Change</button>
            )}
          </div>
          <div className='row'>
            <input
              type="text"
              value={phoneNumberEditMode ? newPhoneNumber : userData.gsm}
              onChange={(e) => setNewPhoneNumber(e.target.value)}
            />
            {phoneNumberEditMode ? (
              <button onClick={handlePhoneNumberSave}>Save</button>
            ) : (
              <button onClick={handlePhoneNumberChange}>Change</button>
            )}
          </div>
          <div className='row'>
            <input
              type="email"
              value={emailEditMode ? newEmail : userData.email}
              onChange={(e) => setNewEmail(e.target.value)}
            />
            {emailEditMode ? (
              <button onClick={handleEmailSave}>Save</button>
            ) : (
              <button onClick={handleEmailChange}>Change</button>
            )}
          </div>
          <div className='row'>
            <button onClick={handlePasswordChange}>Change Password</button>
          </div>
          {passwordEditMode && (
            <div className='row'>
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
              <button onClick={handlePasswordSave}>Save</button>
            </div>
          )}
           <ToastContainer />
        </div>
      ) : (
        <p>Loading profile</p>
      )}
    </div>
  );
};

export default Profile;
