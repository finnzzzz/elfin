import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';

type UserInfo = {
  userName: string;
  userUid: string;
  userImage: string;
  isLogin: boolean;
};

interface Store {
  userInfo: UserInfo;
  login: (name: string | null, uid: string, url: string) => void;
  logout: () => void;
}

const useStore = create<Store>()(
  devtools(
    persist(
      (set) => ({
        userInfo: {
          userName: 'none',
          userUid: '0000',
          userImage: '',
          // userUid: '1DK9kKHiK3ZePLTo0x2Kyfx6Qut1', for dev
          isLogin: false,
        },

        login: (name, uid, url) => {
          set({
            userInfo: {
              userName: name || 'none',
              userUid: uid,
              userImage: url,
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
              userImage: '',
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
