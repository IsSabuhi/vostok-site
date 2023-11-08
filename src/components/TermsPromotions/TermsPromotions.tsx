import styles from './TermsPromotions.module.scss';
import { Heading, Image } from '@chakra-ui/react';
import { listData, listStars } from '../../constants';
import giftCard1 from '../../assets/images/giftCard1000.jpg';
import giftCard2 from '../../assets/images/giftCard5000.jpg';
import giftCard3 from '../../assets/images/giftCard10000.jpg';
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react';

const TermsPromotions = () => {
  const options: EmblaOptionsType = { loop: false };

  const [emblaRef] = useEmblaCarousel(options);
  return (
    <div className={styles.container}>
      <Heading as='h2' size='lg' className={styles.container_text}>
        Условия проведения акции
      </Heading>
      <div className={styles.main}>
        <div className={styles.main_list_img}>
          <ul className={styles.main_list}>
            {listData.map((list, index) => {
              return (
                <li
                  key={index}
                  dangerouslySetInnerHTML={{ __html: list.title }}
                />
              );
            })}
          </ul>
          <div className={styles.top_img}>
            <Image src={giftCard2} alt='' className={styles.giftCard2} />
            <Image src={giftCard1} alt='' className={styles.giftCard1} />
          </div>
        </div>
        <div className={styles.main_star_img}>
          <div className={styles.main_stars}>
            {listStars.map((star, index) => {
              return (
                <p
                  key={index}
                  dangerouslySetInnerHTML={{ __html: star.title }}
                />
              );
            })}
          </div>
          <div className={styles.bottom_img}>
            <Image src={giftCard3} alt='' />
          </div>
        </div>
        <div className={styles.embla}>
          <div className={styles.embla__viewport}>
            <div className={styles.embla__container} ref={emblaRef}>
              <div className={styles.embla__slide}>
                <Image src={giftCard1} alt='' />
                <Image src={giftCard2} alt='' />
                <Image src={giftCard3} alt='' />
              </div>
            </div>
          </div>
        </div>
        {/* <div className={styles.main_images}>
          <div className={styles.top_img}>
            <Image src={giftCard2} alt='' />
            <Image src={giftCard1} alt='' />
          </div>
          <div className={styles.bottom_img}>
            <Image src={giftCard11} alt='' />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default TermsPromotions;
