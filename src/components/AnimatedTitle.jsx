import React, { useEffect, useRef } from "react";
import gsap from "gsap";

// AnimatedTitle 컴포넌트 정의
// props: title(애니메이션할 텍스트), containerClass(추가 스타일링을 위한 클래스)
export default function AnimatedTitle({ title, containerClass }) {
  // DOM 요소 참조를 위한 ref 생성
  const containerRef = useRef(null);

  // 컴포넌트가 마운트될 때 애니메이션 설정
  useEffect(() => {
    // GSAP 컨텍스트 생성 (클린업을 위해)
    const ctx = gsap.context(() => {
      // 타이틀 애니메이션 타임라인 생성
      const titleAnimation = gsap.timeline({
        // 스크롤 트리거 설정
        scrollTrigger: {
          trigger: containerRef.current, // 애니메이션 트리거 요소
          start: "100 bottom", // 시작 지점 (요소가 뷰포트 하단에서 100px 위에 있을 때)
          end: "center bottom", // 종료 지점 (요소가 뷰포트 하단에서 가운데에 있을 때)
          toggleActions: "play none none reverse", // 스크롤 동작에 따른 애니메이션 제어 토글 동작 (재생, 중지, 중지, 역방향)
        },
      });

      // 각 단어에 대한 애니메이션 설정
      titleAnimation.to(".animated-word", {
        opacity: 1, // 투명도를 1로 (완전 불투명)
        transform: "translate3d(0,0,0) rotateY(0deg) rotateX(0deg)", // 3D 변환 초기화
        ease: "power2.inOut", // 이징 함수 설정
        stagger: 0.02, // 각 단어 사이의 지연 시간
      });
    }, containerRef);
    // 컴포넌트 언마운트 시 GSAP 컨텍스트 정리
    return () => ctx.revert();
  }, []);

  return (
    // 애니메이션 컨테이너
    <div ref={containerRef} className={`animated-title ${containerClass}`}>
      {/* 줄바꿈(<br />)을 기준으로 텍스트를 나누어 처리 */}
      {title.split("<br />").map((line, index) => (
        <div
          key={index}
          className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3"
        >
          {/* 각 줄을 단어 단위로 나누어 처리 */}
          {line.split(" ").map((word, i) => (
            <span
              key={i}
              className="animated-word"
              // HTML 태그가 포함된 단어를 안전하게 렌더링
              dangerouslySetInnerHTML={{ __html: word }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
