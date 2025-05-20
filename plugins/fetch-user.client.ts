import usePerfilStore from "~/store/usePerfilStore";

export default defineNuxtPlugin(async () => {
  const useProfile = usePerfilStore();
  if (!useProfile.user) {
    await useProfile.fetchProfile();
  }
});
