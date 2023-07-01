import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';

type UserInfo = {
  userName: string;
  userUid: string;
  isLogin: boolean;
};

interface Store {
  userInfo: UserInfo;
  login: (_name: string, _uid: string) => void;
  logout: () => void;
  test1: string;
  test2: string;
  test3: string;

  setTest1: () => void;
  setTest2: () => void;
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

    test1: 'test1',
    test2: 'test2',
    test3: 'test3',

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

    setTest1: () => {
      set((state) => ({ ...state, test1: '1111' }));
    },
    setTest2: () => {
      set((state) => ({ ...state, test2: '222222' }));
    },
  }))
);

export default useStore;
