import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type UserInfo = {
  userName: string;
  userUid: string;
  isLogin: boolean;
};

interface Store {
  userInfo: UserInfo;
  login: (_name: string, _uid: string) => void;
  logout: () => void;
}

// const useStore = create<Store>()(
//   devtools(
//     persist(
//       (set, get) => ({
//         userInfo: {
//           userName: 'qq',
//           userUid: '0000',
//           isLogin: false,
//         },

//         login: (name, uid) => {
//           set({
//             userInfo: {
//               userName: name,
//               userUid: uid,
//               isLogin: true,
//             },
//           });
//         },

//         logout: () => {
//           set({
//             userInfo: {
//               userName: 'none',
//               userUid: '0000',
//               isLogin: false,
//             },
//           });
//         },
//       }),
//       {
//         name: 'food-storage', // name of the item in the storage (must be unique)
//         storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
//       }
//     )
//   )
// );

const useStore = create<Store>()(
  devtools((set) => ({
    userInfo: {
      userName: 'none',
      userUid: '0000',
      isLogin: false,
    },

    login: (name, uid) => {
      set({
        userInfo: {
          userName: name,
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
  }))
);

export default useStore;
