import { useContext, useState } from "react";
import { UserContext } from "../../contexts/User.Context";
import { fillProfileInfo } from "../../supabase/account/index"; // Import the function to save profile info
import DefaultProfile from "../../assets/pfp.png";

const ProfilePage = () => {
  const {
    currentUser,
    username,
    setUsername,
    profilePicture,
    setProfilePicture,
  } = useContext(UserContext);
  const [newUsername, setNewUsername] = useState(username || "");
  const [newProfilePicture, setNewProfilePicture] = useState(
    profilePicture || DefaultProfile,
  );
  const [loading, setLoading] = useState(false);

  // Handle saving to Supabase
  const handleSaveChanges = async () => {
    if (!currentUser) {
      console.error("No user is logged in.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        id: currentUser.uid, // Assuming uid is the user's unique ID in Supabase
        username: newUsername,
        avatar_url:
          newProfilePicture !== DefaultProfile ? newProfilePicture : null, // Save only if it's not default
      };

      const updatedProfile = await fillProfileInfo(payload);
      setUsername(updatedProfile.username || "Anonymous");
      setProfilePicture(updatedProfile.image_url || DefaultProfile);
      console.log("Profile updated successfully!");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error updating profile:", error.message);
      } else {
        console.error("An unexpected error occurred:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle profile picture selection
  const handleProfilePictureChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setNewProfilePicture(reader.result.toString());
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-lg mx-auto my-10 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Your Profile</h2>
      <div className="flex flex-col items-center mb-6">
        <img
          src={newProfilePicture}
          alt="Profile"
          className="w-24 h-24 rounded-full border object-cover mb-4"
        />
        <label
          htmlFor="profilePicture"
          className="text-sm text-blue-600 cursor-pointer hover:underline"
        >
          Change Profile Picture
        </label>
        <input
          type="file"
          id="profilePicture"
          accept="image/*"
          onChange={handleProfilePictureChange}
          className="hidden"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="username" className="block text-sm font-medium">
          Username
        </label>
        <input
          type="text"
          id="username"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          className="w-full p-2 border rounded mt-1"
        />
      </div>
      <button
        onClick={handleSaveChanges}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
        disabled={loading}
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
};

export default ProfilePage;
