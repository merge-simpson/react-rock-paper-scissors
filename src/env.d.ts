// 타입스크립트는 src 디렉터리 내에 이 파일을 생성(vite 공식)
// 각 env 파일에서 사용할 속성들의 명세 인터페이스를 작성

interface ImportMetaEnv {
  // Prefix: (default) VITE_로 시작하는 이름을 사용해야 VITE에서 사용 가능합니다.
  readonly VITE_API_BASE_URL: string;

  // === Available version for each feature ===
  // 안드로이드앱 버전은 _AOS_VERSION 등으로 명시하고자 함.
  // readonly VITE_REQUIRED_AOS_VERSION: string;
  // readonly VITE_KAKAO_1S_LOGIN_AOS_VERSION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
