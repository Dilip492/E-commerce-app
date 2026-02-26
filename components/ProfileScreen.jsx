import { ScrollView, View } from "react-native";
import LogoutButton from "./LogoutButton";
import MenuItem from "./MenuItem";
import ProfileHeader from "./ProfileHeader";
// import ProfileHeader from "../components/ProfileHeader";
import StatsCards from "./StatsCards";

export default function ProfileScreen() {
  return (
    <ScrollView className="flex-1 bg-gray-100">
      <ProfileHeader/>
      <StatsCards />

      <View className="mt-4 bg-white rounded-2xl mx-4 p-2">
        <MenuItem icon="person-outline" title="My Account" />
        <MenuItem icon="location-outline" title="Address Book" />
        <MenuItem icon="card-outline" title="Payments & Refunds" />
        <MenuItem icon="lock-closed-outline" title="Change Password" />
        <MenuItem icon="notifications-outline" title="Notifications" />
      </View>

      <View className="mt-4 bg-white rounded-2xl mx-4 p-2">
        <MenuItem icon="cube-outline" title="My Orders" />
        <MenuItem icon="help-circle-outline" title="Help & Support" />
      </View>

      <LogoutButton />
    </ScrollView>
  );
}
