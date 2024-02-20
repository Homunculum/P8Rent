import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { UserService } from "../../services/UsersService";


const Profile = () => {
  const { userId } = useContext(AuthContext);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    if (userId) {
      getUserData(userId);
    }
  }, [userId]);

  const getUserData = async (userId: string) => {
    try {
      const response = await UserService.getUserById(userId);
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleEmailChange = () => {
    // Email değiştirme işlemi burada gerçekleştirilebilir
  };

  const handlePhoneNumberChange = () => {
    // Telefon numarası değiştirme işlemi burada gerçekleştirilebilir
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
            <span>{userData.gsm}</span>
            <button onClick={handlePhoneNumberChange}>Değiştir</button>
          </div>
          <div>
            <label>Email:</label>
            <span>{userData.email}</span>
            <button onClick={handleEmailChange}>Değiştir</button>
          </div>
          <div>
            {/* Şifre değiştirme işlemi burada gerçekleştirilebilir */}
            <button>Şifre Değiştir</button>
          </div>
        </div>
      ) : (
        <p>Profil bilgileri yükleniyor...</p>
      )}
    </div>
  );
};

export default Profile;
