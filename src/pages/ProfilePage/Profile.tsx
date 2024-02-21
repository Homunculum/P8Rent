import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { UserService } from '../../services/UsersService';
import { UsersModel } from '../../models/responses/UsersModel';


const Profile: React.FC = () => {
  const { id } = useContext(AuthContext);
  const [userData, setUserData] = useState<UsersModel | null>(null);
  const [emailEditMode, setEmailEditMode] = useState(false);
  const [phoneNumberEditMode, setPhoneNumberEditMode] = useState(false);
  const [passwordEditMode, setPasswordEditMode] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
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

  const handleEmailSave = async () => {
    
      await UserService.updateEmail(parseInt(id!), newEmail);
      setEmailEditMode(false);
      getUserData(id!);
    
  };

  const handlePhoneNumberSave = async () => {
    try {
      if (!newPhoneNumber) {
        throw new Error('Telefon numarası boş olamaz.');
      }
      await UserService.updatePhoneNumber(parseInt(id!), newPhoneNumber);
      setPhoneNumberEditMode(false);
      getUserData(id!);
    } catch (error) {
      console.error('Error updating phone number:', error);
      setError('Error updating phone number: ' );
    }
  };

  const handlePasswordSave = async () => {
   
      await UserService.updatePassword(parseInt(id!), newPassword, confirmNewPassword);
      setPasswordEditMode(false);
      setNewPassword('');
      setConfirmNewPassword('');
    
  };

  return (
    <div className="container">
      {userData ? (
        <div>
          <h2>Profil Sayfası</h2>
          <div>
            <label>Ad:</label>
            <span>{userData.name}</span>
          </div>
          <div>
            <label>Soyad:</label>
            <span>{userData.surname}</span>
          </div>
          <div>
            <label>Telefon Numarası:</label>
            {phoneNumberEditMode ? (
              <>
                <input
                  type="text"
                  value={newPhoneNumber}
                  onChange={(e) => setNewPhoneNumber(e.target.value)}
                />
                <button onClick={handlePhoneNumberSave}>Kaydet</button>
              </>
            ) : (
              <>
                <span>{userData.gsm}</span>
                <button onClick={handlePhoneNumberChange}>Değiştir</button>
              </>
            )}
          </div>
          <div>
            <label>Email:</label>
            {emailEditMode ? (
              <>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
                <button onClick={handleEmailSave}>Kaydet</button>
              </>
            ) : (
              <>
                <span>{userData.email}</span>
                <button onClick={handleEmailChange}>Değiştir</button>
              </>
            )}
          </div>
          <div>
            <button onClick={handlePasswordChange}>Şifre Değiştir</button>
          </div>
          {passwordEditMode && (
            <div>
              <input
                type="password"
                placeholder="Yeni Şifre"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Yeni Şifre Tekrar"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
              <button onClick={handlePasswordSave}>Kaydet</button>
            </div>
          )}
         
        </div>
      ) : (
        <p>Profil bilgileri yükleniyor...</p>
      )}
    </div>
  );
};

export default Profile;
