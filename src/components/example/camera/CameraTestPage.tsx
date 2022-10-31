import { DangerButton, DarkButton } from "@styles/button";
import { useCallback, useEffect, useRef, useState } from "react";
import SampleImage from "@assets/img/sample.jpeg";
import resolveEXIFRotate from "@utils/upload/resolveEXIFRotate";

const CameraTestPage = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [file, setFile] = useState<File | null>(null); // from files
  const [photoUrl, setPhotoUrl] = useState<string | ArrayBuffer | null>(null);
  const imageUploaderRef = useRef<HTMLInputElement | null>(null);

  const clearImage = useCallback<React.MouseEventHandler<HTMLButtonElement>>(
    (evt) =>
      imageUploaderRef.current &&
      setPhotoUrl((imageUploaderRef.current.value = "")),
    [imageUploaderRef.current]
  );

  useEffect(() => {
    console.debug(photoUrl);
  }, [photoUrl]);

  useEffect(() => {
    files &&
      resolveEXIFRotate(files)
        .then(setFile) //
        .catch(console.error);
  }, [files]);

  return (
    <div className="flex flex-col gap-4 py-4 px-8 items-center justify-center">
      <main className="w-full max-w-[40rem]">
        <h1 className="text-2xl font-bold">Camera Test Page</h1>
        <aside className="py-2">
          <h1 className="text-lg font-bold">적용/개선 목록</h1>
          <ul className="list-['•_'] list-inside">
            <li>
              안드로이드 삼성/소니 일부 기종에서 촬영한 사진이 회전하는 현상
              (EXIF 정보에 따라 사진 회전하여 다시 저장하여 제어함.)
            </li>
          </ul>
        </aside>

        <section className="flex flex-row justify-between gap-4 items-center px-8 py-4 border shadow-md rounded-md">
          <article>
            <h1 className="text-lg font-bold">미리 보기</h1>

            <figure className="relative">
              <img
                src={(photoUrl as string) || SampleImage}
                className={`w-40 h-40 border rounded-md ${
                  !!photoUrl ? "border-dark" : ""
                }`}
                // TODO 다국어 처리
                alt={
                  !!photoUrl
                    ? "이미지 미리보기(Image Preview)"
                    : "선택된 사진이 없을 때는 눈 덮인 산을 멀리서 담은 샘플 이미지"
                }
              />
              {!photoUrl && (
                <aside className="absolute left-0 top-0 right-0 bottom-0 bg-white bg-opacity-30 shadow-inner z-10 flex items-center justify-center">
                  <h1 className="drop-shadow text-lg font-black text-light select-none">
                    SAMPLE
                  </h1>
                </aside>
              )}
            </figure>
          </article>

          <label>
            <input
              type="file"
              accept="image/*"
              ref={imageUploaderRef}
              className="hidden"
              onChange={(evt) => {
                const reader = new FileReader();
                reader.readAsDataURL(evt.target.files![0]);
                setFiles(evt.target?.files);

                // (Example of onload)
                reader.onload = (evt) => {
                  const photoUrl = evt.target?.result;
                  photoUrl && setPhotoUrl(photoUrl);
                };
              }}
            />
            <DarkButton onClick={(evt) => imageUploaderRef.current?.click()}>
              업로드
            </DarkButton>
          </label>
          <label>
            <DangerButton onClick={clearImage}>즉시 삭제</DangerButton>
          </label>
        </section>
      </main>
    </div>
  );
};

export default CameraTestPage;
