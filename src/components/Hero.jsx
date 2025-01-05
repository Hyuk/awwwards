import { useState, useRef, useEffect } from 'react'
import Button from './Button';
import { TiLocationArrow } from 'react-icons/ti';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  // 현재 비디오 인덱스 상태
  const [currentIndex, setCurrentIndex] = useState(1);
  // 비디오 클릭 여부 상태
  const [hasClicked, setHasClicked] = useState(false);
  // 로딩 상태
  const [isLoading, setIsLoading] = useState(true);
  // 로드된 비디오 수 카운터
  const [loadedVideos, setLoadedVideos] = useState(0);

  const totalVideos = 4; // 총 비디오 수
  const nextVideoRef = useRef(null); // 다음 비디오 참조

  // 0 % 4 = 0 + 1 = 1
  // 1 % 4 = 1 + 1 = 2
  // 2 % 4 = 2 + 1 = 3
  // 3 % 4 = 3 + 1 = 4
  // 4 % 4 = 0 + 1 = 1
  const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

  // 미니 비디오 클릭 핸들러
  function handleMiniVdClick() {
    setHasClicked(true);
    setCurrentIndex(upcomingVideoIndex);
  }

  // 모든 비디오가 로드되면 로딩 상태 해제
  useEffect(() => {
    if(loadedVideos === totalVideos - 1) {
      setIsLoading(false);
    }
  }, [loadedVideos])

  // 비디오 전환 애니메이션 효과
  useGSAP(() => {
    if (hasClicked) {
      // 다음 비디오를 보이게 하고 확대 애니메이션 적용
      gsap.set("#next-video", {
        visibility: "visible",
      })
      gsap.to('#next-video', {
        transformOrigin: 'center center',
        scale: 1,
        width: '100%',
        height: '100%',
        duration: 1,
        ease: 'power1.inOut',
        onStart: () => nextVideoRef.current.play(),
      })
      // 현재 비디오 축소 애니메이션
      gsap.from("#current-video", {
        transformOrigin: 'center center',
        scale: 0,
        duration: 1.5,
        ease: 'power1.inOut',
      })
    }
  }, {dependencies: [currentIndex], revertOnUpdate: true})

  // 비디오 프레임 스크롤 애니메이션
  useGSAP(() => {
    // 초기 클립 패스와 테두리 반경 설정
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)",
      borderRadius: "0 0 40% 10%",
    })

    // 스크롤에 따른 클립 패스 애니메이션
    gsap.from("#video-frame", {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      borderRadius: '0 0 0 0',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: "#video-frame",
        start: 'center center',
        end: 'bottom center',
        scrub: true, 
      }
    })
  })

  // 비디오 로드 완료 핸들러
  function handleVideoLoad() {
    setLoadedVideos(prev => prev + 1);
  }

  // 비디오 소스 URL 생성
  function getVideoSrc(index) {
    return `videos/hero-${index}.mp4`;
  }

  return (
    <>
      {/* 전체 히어로 섹션 컨테이너 */}
      <div className='relative h-dvh w-screen overflow-x-hidden'>
        {/* 로딩 상태일 때 표시되는 로딩 애니메이션 */}
        {isLoading && (
          <div className='flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50'>
            <div className='three-body'>
              {/* 로딩 애니메이션을 위한 3개의 점 */}
              <div className='three-body__dot'></div>
              <div className='three-body__dot'></div>
              <div className='three-body__dot'></div>
            </div>
          </div>
        )}
  
        {/* 메인 비디오 프레임 컨테이너 */}
        <div id="video-frame" className='relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75'>
          <div>
            {/* 중앙에 위치한 미니 비디오 프리뷰 (호버 시 표시) */}
            <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
              <div onClick={handleMiniVdClick} className='origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100'>
                {/* 다음 비디오 프리뷰 */}
                <video 
                  ref={nextVideoRef} 
                  src={getVideoSrc(upcomingVideoIndex)} 
                  loop
                  muted
                  id="current-video"
                  className='size-64 origin-center scale-150 object-cover object-center'
                  onLoadedData={handleVideoLoad}
                />
              </div>
            </div>
  
            {/* 전환 애니메이션을 위한 다음 비디오 (초기에는 숨겨져 있음) */}
            <video 
              ref={nextVideoRef}
              src={getVideoSrc(currentIndex)} 
              loop
              muted
              id="next-video"
              className='absolute-center invisible absolute z-20 size-64 object-cover object-center'
              onLoadedData={handleVideoLoad}
            />
  
            {/* 현재 재생 중인 메인 배경 비디오 */}
            <video 
              src={getVideoSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex)}
              autoPlay
              loop
              muted
              className='absolute left-0 top-0 size-full object-cover object-center'
              onLoadedData={handleVideoLoad}
            />
          </div>
  
          {/* 오른쪽 하단 'Gaming' 텍스트 (파란색) */}
          <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
            G<b>a</b>ming
          </h1>
  
          {/* 왼쪽 상단 콘텐츠 영역 */}
          <div className="absolute left-0 top-0 z-40 size-full">
            <div className="mt-24 px-5 sm:px-10">
              {/* 메인 헤딩 */}
              <h1 className="special-font hero-heading text-blue-100">redefi<b>n</b>e</h1>
              {/* 서브 텍스트 */}
              <p className="mb-5 max-2-64 font-robert-regular text-blue-100">
                Enter the Metagame Layer<br />Unleash the Play Economy
              </p>
              {/* 트레일러 시청 버튼 */}
              <Button 
                id="watch-trailer" 
                title="Watch Trailer" 
                leftIcon={<TiLocationArrow />}
                containerClass="!bg-yellow-300 flex gap-1"
              />
            </div>
          </div>
        </div>
  
        {/* 오른쪽 하단 'Gaming' 텍스트 (검은색 - 오버레이) */}
        <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
          G<b>a</b>ming
        </h1>
      </div>
    </>
  )
}
