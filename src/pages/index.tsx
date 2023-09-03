import { useRouter } from "next/router";

export default function index() {
  const router = useRouter();
  return (
    <div>
      <h2>godo</h2>
      <button
        onClick={() => {
          router.push("/about");
        }}
      >
        test page 이동하기
      </button>
    </div>
  );
}

// TODO: 추후 seo 및 정적 페이지 생성해야 할 때 사용
export async function getStaticProps() {
  return {
    props: {},
  };
}
