import { useOnboard } from "@/store/onboard/onBoard";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface IOnboarding {
  isOnboarded: boolean;
  checkFirstLaunch: () => Promise<void>;
  completeOnboarding: (isOnboarded: boolean) => void;
}
export const useOnboarding = (): IOnboarding => {
  const { isOnboarded = false, completeOnboarding } = useOnboard(
    (state) => state
  );

  const checkFirstLaunch = async () => {
    try {
      const value = await AsyncStorage.getItem("hasLaunched");
      if (value === null) {
        completeOnboarding(true);
      } else {
        completeOnboarding(false);
      }
    } catch (error) {
      console.error("Error checking first launch", error);
    }
  };

  return {
    isOnboarded,
    checkFirstLaunch,
    completeOnboarding,
  };
};
