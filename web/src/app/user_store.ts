import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';

type UserInfo = {
  userName: string;
  userUid: string;
  isLogin: boolean;
};

interface Store {
  userInfo: UserInfo;
  login: (name: string | null, uid: string) => void;
  logout: () => void;
}

const useStore = create<Store>()(
  devtools(
    persist(
      (set) => ({
        userInfo: {
          userName: 'none',
          userUid: '0000',
          // userUid: '1DK9kKHiK3ZePLTo0x2Kyfx6Qut1', for dev
          isLogin: false,
        },

        login: (name, uid) => {
          set({
            userInfo: {
              userName: name || 'none',
              userUid: uid,
              isLogin: true,
            },
          });
        },

        logout: () => {
          set((state) => ({
            ...state,
            userInfo: {
              userName: 'none',
              userUid: '0000',
              isLogin: false,
            },
          }));
        },
      }),
      { name: 'food-storage', storage: createJSONStorage(() => sessionStorage) }
    )
  )
);

export default useStore;
