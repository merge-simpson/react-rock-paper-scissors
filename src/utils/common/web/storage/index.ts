import STORAGE_KEY from "../storage-key";

const storageManager = {
  // setItem: localStorage.setItem, => Illegal invocation
  setItem: (key: string, value: string) => localStorage.setItem(key, value),

  getItem: (key: string) => localStorage.getItem(key),

  // 기기/브라우저 종속적 데이터가 있다면 STICKY하게 보존하고 다른 것만 지움.
  clearAllUnsticky: () => {
    type T = { [key: string]: string };
    const stickyKeys = Object.keys(STORAGE_KEY.STICKY);
    const stickyObject = Object.keys(localStorage).reduce<T>(
      (acc, keyName) =>
        stickyKeys.includes(keyName)
          ? { ...acc, [keyName]: localStorage.getItem(keyName)! }
          : acc,
      {}
    );

    localStorage.clear();

    Object.keys(stickyObject).forEach((keyName) =>
      localStorage.setItem(keyName, stickyObject[keyName])
    );
  },
};

export default storageManager;
