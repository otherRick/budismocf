import MobileFirstMeditation from '@/components/ZenRioMobile';
import UltraModernMeditation from '@/components/ZenRioWeb';
import useIsMobile from '@/hooks/useIsMobile';

const HomePage = () => {
  const isMobile = useIsMobile();
  return (
    <div className='relative'>
      {isMobile ? <MobileFirstMeditation /> : <UltraModernMeditation />}
    </div>
  );
};
export default HomePage;
