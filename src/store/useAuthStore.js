import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  
  // Basic auth actions
  login: (userData) => set({ user: userData, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
  register: (userData) => set({ user: userData, isAuthenticated: true }),
  
  // Auth0 specific actions
  setAuth0User: (auth0User) => {
    if (auth0User) {
      set({
        user: {
          id: auth0User.sub,
          name: auth0User.name,
          email: auth0User.email,
          picture: auth0User.picture,
          isAdmin: auth0User.email === 'admin@example.com' // Simple admin check - replace with your logic
        },
        isAuthenticated: true
      });
    } else {
      set({ user: null, isAuthenticated: false });
    }
  }
}));