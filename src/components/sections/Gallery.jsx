import { useScrollAnimation } from '../../hooks/useScrollAnimation'

const images = [
  { src: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&q=80', alt: 'Coffee farm', tall: true },
  { src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80', alt: 'Pour over coffee', tall: false },
  { src: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80', alt: 'Espresso shot', tall: false },
  { src: 'https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=600&q=80', alt: 'Coffee roasting', tall: true },
  { src: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&q=80', alt: 'Coffee cherries', tall: false },
  { src: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&q=80', alt: 'Barista at work', tall: false },
  { src: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&q=80', alt: 'Coffee drying beds', tall: true },
  { src: 'https://images.unsplash.com/photo-1504630083234-14187a9df0f5?w=600&q=80', alt: 'Roastery', tall: false },
]

export default function Gallery() {
  const titleRef = useScrollAnimation()

  return (
    <section id="gallery" className="bg-mist py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <div ref={titleRef} className="fade-up text-center mb-16">
          <div className="section-label mb-5">Gallery</div>
          <h2 className="display-lg text-espresso">
            The world<br />
            behind your <em>cup.</em>
          </h2>
        </div>

        {/* Masonry-style grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
          {images.map((img, i) => (
            <div
              key={i}
              className="break-inside-avoid overflow-hidden group"
            >
              <img
                src={img.src}
                alt={img.alt}
                className={`w-full object-cover group-hover:scale-105 transition-transform duration-700 ${
                  img.tall ? 'aspect-[3/4]' : 'aspect-square'
                }`}
              />
            </div>
          ))}
        </div>

        {/* Caption */}
        <p className="text-center font-mono text-xs text-caramel/40 tracking-widest2 uppercase mt-10">
          From farm to roastery to cup — every image is real, every place we've been.
        </p>

      </div>
    </section>
  )
}
