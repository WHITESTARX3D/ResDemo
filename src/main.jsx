import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './styles.css'

gsap.registerPlugin(ScrollTrigger)

const asset = (name) => `/images/${name}`

const menuItems = [
  { category: 'Starters', name: 'The Contraband', description: 'Smoked paneer cigar, pickled onion, black garlic chutney.', price: '₹495', image: asset('dish-closeup.jpg'), position: 'center 55%' },
  { category: 'Starters', name: 'Cell Block Chaat', description: 'Crisp potato, tamarind, whipped yoghurt, garden herbs.', price: '₹425', image: asset('starter-chaat.jpg'), position: 'center' },
  { category: 'Main Course', name: 'The Warden’s Table', description: 'Charred seasonal vegetables, saffron emulsion, millet crisp.', price: '₹795', image: asset('dish-closeup.jpg'), position: 'center 80%' },
  { category: 'Main Course', name: 'Black Pepper Paneer', description: 'Coal-fired paneer, pepper jus, curry leaf, toasted sesame.', price: '₹745', image: asset('scene-kitchen.jpg'), position: 'center 58%' },
  { category: 'Indian', name: 'Slow Crime Dal', description: 'Black lentils, smoked tomato, cultured butter, sourdough naan.', price: '₹595', image: asset('dish-closeup.jpg'), position: 'right 30%' },
  { category: 'Indian', name: 'Guilty Palak', description: 'Baby spinach, silken tofu, charred garlic, kasuri methi.', price: '₹625', image: asset('scene-kitchen.jpg'), position: 'center 78%' },
  { category: 'Chinese', name: 'Wok Escape', description: 'Crisp greens, toasted chilli, five-spice tofu, sesame dust.', price: '₹545', image: asset('dish-closeup.jpg'), position: 'left 75%' },
  { category: 'Desserts', name: 'The Last Meal', description: 'Dark chocolate, jaggery caramel, sea salt, toasted filo.', price: '₹495', image: asset('dessert.jpg'), position: 'center' },
  { category: 'Drinks', name: 'Midnight Tonic', description: 'Smoked kokum, basil, citrus, tonic and a little mischief.', price: '₹325', image: asset('drink.jpg'), position: 'center' }
]

const categories = ['All', 'Starters', 'Main Course', 'Indian', 'Chinese', 'Desserts', 'Drinks']

const galleryItems = [
  { image: asset('cell-interior.jpg'), title: 'Cells with a softer side', meta: 'The dining room', className: 'gallery-tall' },
  { image: asset('scene-kitchen.jpg'), title: 'The open kitchen', meta: 'Where the story is made', className: 'gallery-wide' },
  { image: asset('dish-closeup.jpg'), title: 'Evidence of flavour', meta: 'Signature tasting plate', className: 'gallery-square' },
  { image: asset('dining-atmosphere.jpg'), title: 'After dark', meta: 'The atmosphere', className: 'gallery-wide gallery-offset' },
  { image: asset('scene-corridor.jpg'), title: 'Proceed with appetite', meta: 'The passage in', className: 'gallery-corridor' }
]

const whyCards = [
  { index: '01', title: 'The theme', text: 'A restaurant experience inspired by a prison environment — considered, cinematic, and completely unexpected.' },
  { index: '02', title: 'Pure vegetarian', text: 'A menu built entirely around vegetables, grains, fire and a little creative mischief. Nothing is an afterthought.' },
  { index: '03', title: 'The atmosphere', text: 'Low light, warm brass and cell-like architecture make every table feel like a secret worth keeping.' },
  { index: '04', title: 'The food', text: 'Beautifully presented plates with bold Indian soul and a modern point of view. Evidence will be served.' }
]

function ArrowIcon({ direction = 'right' }) {
  return <svg className={`icon-arrow ${direction === 'down' ? 'icon-arrow-down' : ''}`} viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

function MenuIcon({ open }) {
  return <span className={`menu-icon ${open ? 'is-open' : ''}`} aria-hidden="true"><i /><i /></span>
}

function App() {
  const rootRef = useRef(null)
  const cinematicRef = useRef(null)
  const stageRef = useRef(null)
  const corridorRef = useRef(null)
  const kitchenRef = useRef(null)
  const dishRef = useRef(null)
  const gateLeftRef = useRef(null)
  const gateRightRef = useRef(null)
  const heroCopyRef = useRef(null)
  const brandRevealRef = useRef(null)
  const videoRef = useRef(null)
  const cursorGlowRef = useRef(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [navSolid, setNavSolid] = useState(false)
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [videoReady, setVideoReady] = useState(false)

  const filteredMenu = activeCategory === 'All' ? menuItems : menuItems.filter((item) => item.category === activeCategory)

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return undefined
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const context = gsap.context(() => {
      if (!reduced) {
        const sequenceSteps = gsap.utils.toArray('.sequence-step')
        gsap.set([kitchenRef.current, dishRef.current, brandRevealRef.current], { autoAlpha: 0 })
        gsap.set(sequenceSteps, { autoAlpha: 0 })
        gsap.set(sequenceSteps[0], { autoAlpha: 1 })

        const cinematicTimeline = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: cinematicRef.current,
            start: 'top top',
            end: '+=2500',
            scrub: 1.15,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true
          },
          onUpdate: () => {
            if (videoReady && videoRef.current?.duration) {
              videoRef.current.currentTime = cinematicTimeline.progress() * videoRef.current.duration
            }
          }
        })

        cinematicTimeline
          .to(heroCopyRef.current, { autoAlpha: 0, y: -28, filter: 'blur(8px)', duration: 0.15 }, 0.03)
          .to(sequenceSteps[0], { autoAlpha: 0, duration: 0.1 }, 0.11)
          .to(gateLeftRef.current, { xPercent: -102, duration: 0.22 }, 0.12)
          .to(gateRightRef.current, { xPercent: 102, duration: 0.22 }, 0.12)
          .to(corridorRef.current, { scale: 1.18, filter: 'blur(2px)', autoAlpha: 0.25, duration: 0.29 }, 0.1)
          .to(sequenceSteps[1], { autoAlpha: 1, duration: 0.12 }, 0.26)
          .to(sequenceSteps[1], { autoAlpha: 0, duration: 0.12 }, 0.43)
          .fromTo(kitchenRef.current, { autoAlpha: 0, scale: 1.13, xPercent: 3 }, { autoAlpha: 1, scale: 1.03, xPercent: 0, duration: 0.27 }, 0.3)
          .to(kitchenRef.current, { scale: 1.16, autoAlpha: 0.16, duration: 0.27 }, 0.56)
          .to(sequenceSteps[2], { autoAlpha: 1, duration: 0.12 }, 0.42)
          .to(sequenceSteps[2], { autoAlpha: 0, duration: 0.12 }, 0.65)
          .fromTo(dishRef.current, { autoAlpha: 0, scale: 1.28, yPercent: 5 }, { autoAlpha: 1, scale: 1.05, yPercent: 0, duration: 0.29 }, 0.52)
          .to(dishRef.current, { scale: 1.23, autoAlpha: 0.35, duration: 0.25 }, 0.78)
          .fromTo(brandRevealRef.current, { autoAlpha: 0, y: 32, filter: 'blur(8px)' }, { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.2 }, 0.79)

        gsap.utils.toArray('.reveal').forEach((element) => {
          gsap.fromTo(element, { autoAlpha: 0, y: 34 }, {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: element, start: 'top 86%', once: true }
          })
        })

        gsap.utils.toArray('.parallax-image').forEach((element) => {
          gsap.fromTo(element, { yPercent: -5 }, {
            yPercent: 5,
            ease: 'none',
            scrollTrigger: { trigger: element, start: 'top bottom', end: 'bottom top', scrub: true }
          })
        })

        gsap.utils.toArray('.line-reveal').forEach((element) => {
          gsap.fromTo(element, { scaleX: 0, transformOrigin: 'left center' }, {
            scaleX: 1,
            duration: 1.2,
            ease: 'power3.inOut',
            scrollTrigger: { trigger: element, start: 'top 88%', once: true }
          })
        })
      } else {
        gsap.set([heroCopyRef.current, corridorRef.current, brandRevealRef.current], { autoAlpha: 1 })
        gsap.set([gateLeftRef.current, gateRightRef.current], { xPercent: 0 })
        gsap.set(kitchenRef.current, { autoAlpha: 0 })
        gsap.set(dishRef.current, { autoAlpha: 0 })
      }
    }, root)

    return () => context.revert()
  }, [videoReady])

  useEffect(() => {
    const root = rootRef.current
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!root || isTouch || reduced) return undefined

    const glow = cursorGlowRef.current
    let targetX = -100
    let targetY = -100
    let currentX = targetX
    let currentY = targetY
    let animationFrame
    const tick = () => {
      currentX += (targetX - currentX) * 0.14
      currentY += (targetY - currentY) * 0.14
      if (glow) glow.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`
      animationFrame = requestAnimationFrame(tick)
    }
    const onMove = (event) => {
      targetX = event.clientX
      targetY = event.clientY
      if (glow) glow.style.opacity = '1'
    }
    const onLeave = () => { if (glow) glow.style.opacity = '0' }
    root.addEventListener('mousemove', onMove)
    root.addEventListener('mouseleave', onLeave)
    animationFrame = requestAnimationFrame(tick)

    const magnetic = root.querySelectorAll('.magnetic')
    const magneticHandlers = []
    magnetic.forEach((button) => {
      const move = (event) => {
        const box = button.getBoundingClientRect()
        const x = (event.clientX - (box.left + box.width / 2)) * 0.16
        const y = (event.clientY - (box.top + box.height / 2)) * 0.16
        gsap.to(button, { x, y, duration: 0.35, ease: 'power3.out', overwrite: true })
      }
      const leave = () => gsap.to(button, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.45)' })
      button.addEventListener('mousemove', move)
      button.addEventListener('mouseleave', leave)
      magneticHandlers.push({ button, move, leave })
    })

    return () => {
      cancelAnimationFrame(animationFrame)
      root.removeEventListener('mousemove', onMove)
      root.removeEventListener('mouseleave', onLeave)
      magneticHandlers.forEach(({ button, move, leave }) => {
        button.removeEventListener('mousemove', move)
        button.removeEventListener('mouseleave', leave)
      })
    }
  }, [])

  const closeMobile = () => setMobileOpen(false)
  const openLightbox = (index) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)
  const nextLightbox = () => setLightboxIndex((index) => (index === null ? 0 : (index + 1) % galleryItems.length))
  const previousLightbox = () => setLightboxIndex((index) => (index === null ? 0 : (index - 1 + galleryItems.length) % galleryItems.length))

  useEffect(() => {
    if (lightboxIndex === null) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeLightbox()
      if (event.key === 'ArrowRight') nextLightbox()
      if (event.key === 'ArrowLeft') previousLightbox()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [lightboxIndex])

  return (
    <div ref={rootRef} className="site-shell">
      <div ref={cursorGlowRef} className="cursor-glow" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <header className={`site-nav ${navSolid ? 'nav-solid' : ''}`}>
        <a className="wordmark" href="#top" onClick={closeMobile} aria-label="Kaidi Kitchen home">
          <span className="wordmark-mark">KK</span>
          <span className="wordmark-text">Kaidi <b>Kitchen</b></span>
        </a>
        <nav className={`nav-links ${mobileOpen ? 'mobile-visible' : ''}`} aria-label="Main navigation">
          <a href="#experience" onClick={closeMobile}>Experience</a>
          <a href="#menu" onClick={closeMobile}>Menu</a>
          <a href="#gallery" onClick={closeMobile}>Gallery</a>
          <a href="#about" onClick={closeMobile}>About</a>
          <a href="#contact" onClick={closeMobile}>Contact</a>
          <a href="#reservation" className="nav-reserve mobile-reserve" onClick={closeMobile}>Reserve table <ArrowIcon /></a>
        </nav>
        <a href="#reservation" className="nav-reserve desktop-reserve magnetic">Reserve table <ArrowIcon /></a>
        <button className="mobile-menu-button" onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={mobileOpen}>
          <MenuIcon open={mobileOpen} />
        </button>
      </header>

      <main id="top">
        <section ref={cinematicRef} className="cinematic-section" aria-label="Kaidi Kitchen cinematic introduction">
          <div ref={stageRef} className="cinematic-stage">
            <div className="scene-layer scene-corridor" ref={corridorRef} />
            <div className="scene-layer scene-kitchen" ref={kitchenRef} />
            <div className="scene-layer scene-dish" ref={dishRef} />
            <video ref={videoRef} className={`scene-video ${videoReady ? 'video-ready' : ''}`} src="/videos/kaidi-kitchen.mp4" muted playsInline preload="auto" onCanPlay={() => setVideoReady(true)} onError={() => setVideoReady(false)} aria-hidden="true" />
            <div className="cinematic-grade" />
            <div className="corridor-vignette" />
            <div className="gate gate-left" ref={gateLeftRef}><span /><span /><span /><span /><span /><span /><span /><span /></div>
            <div className="gate gate-right" ref={gateRightRef}><span /><span /><span /><span /><span /><span /><span /><span /></div>
            <div className="gate-crossbar gate-crossbar-top" />
            <div className="gate-crossbar gate-crossbar-bottom" />
            <div className="gate-lock"><span className="lock-shackle" /><span className="lock-body" /></div>

            <div ref={heroCopyRef} className="hero-copy">
              <p className="eyebrow">Welcome to the cell.</p>
              <p className="hero-kicker">Kaidi Kitchen <span /> Pure vegetarian dining</p>
              <h1>Where every meal<br /><em>has a story.</em></h1>
              <div className="hero-actions">
                <a href="#experience" className="button button-light magnetic">Enter the kitchen <ArrowIcon /></a>
                <a href="#menu" className="text-link">Explore menu <ArrowIcon /></a>
              </div>
            </div>

            <div className="sequence-captions" aria-hidden="true">
              <span className="sequence-step">01 <i /> The gate</span>
              <span className="sequence-step">02 <i /> Behind the bars</span>
              <span className="sequence-step">03 <i /> Made to be remembered</span>
            </div>
            <div ref={brandRevealRef} className="brand-reveal">
              <p className="eyebrow">The sentence is delicious.</p>
              <h2>Kaidi <em>Kitchen</em></h2>
              <a href="#reservation" className="button button-light magnetic">Reserve your table <ArrowIcon /></a>
            </div>
            <div className="scroll-cue"><span className="scroll-cue-line" /> Scroll to enter</div>
            <div className="frame-number">KK / 001</div>
          </div>
        </section>

        <section id="experience" className="experience-section section-pad">
          <div className="section-topline reveal"><span>01 — The experience</span><span>Est. 2024 / Kolkata</span></div>
          <div className="experience-intro">
            <div className="experience-heading reveal"><p className="eyebrow">Not your ordinary restaurant.</p><h2>A little <em>danger</em><br />in every detail.</h2></div>
            <div className="experience-copy reveal"><p>Kaidi Kitchen turns dinner into a story. Step through the bars and into a world of low light, open flames and plates that refuse to behave.</p><p className="muted-copy">A jail-inspired atmosphere meets an unapologetically modern vegetarian kitchen — built for curious appetites and the stories that happen around a table.</p><a className="arrow-link" href="#about">Read our story <ArrowIcon /></a></div>
          </div>
          <div className="experience-image-wrap reveal">
            <div className="experience-image-frame image-frame"><img className="parallax-image" src={asset('dining-atmosphere.jpg')} alt="Warmly lit dining room behind black metal partitions" loading="lazy" /></div>
            <div className="image-stamp">The house of<br /><em>great escape</em><span>KK — 24</span></div>
            <div className="image-caption">Black metal. Brass light. <em>Zero ordinary.</em></div>
          </div>
          <div className="stats-grid reveal">
            <div><strong>100%</strong><span>Vegetarian</span></div>
            <div><strong>01</strong><span>One of a kind<br />dining experience</span></div>
            <div><strong>∞</strong><span>Memorable<br />ambience</span></div>
          </div>
        </section>

        <section id="menu" className="menu-section section-pad">
          <div className="section-topline reveal"><span>02 — The evidence</span><span>Served daily / 12—23</span></div>
          <div className="menu-heading-row reveal"><div><p className="eyebrow">Guilty of great taste.</p><h2>The <em>menu</em></h2></div><p>Every plate is a little piece of evidence.<br />Order with intent.</p></div>
          <div className="category-tabs reveal" role="tablist" aria-label="Menu categories">
            {categories.map((category) => <button key={category} className={activeCategory === category ? 'active' : ''} onClick={() => setActiveCategory(category)} role="tab" aria-selected={activeCategory === category}>{category}</button>)}
          </div>
          <div className="menu-grid" key={activeCategory}>
            {filteredMenu.map((item, index) => <article className="menu-card reveal" key={`${item.name}-${index}`}>
              <div className="menu-image-wrap"><img src={item.image} alt={item.name} loading="lazy" style={{ objectPosition: item.position }} /><span className="menu-card-number">0{index + 1}</span><button className="menu-add" aria-label={`View ${item.name}`}>+</button></div>
              <div className="menu-card-body"><div><h3>{item.name}</h3><p>{item.description}</p></div><strong>{item.price}</strong></div>
            </article>)}
          </div>
          <div className="menu-foot reveal"><span>Prices in INR / inclusive of applicable taxes</span><a href="#reservation" className="arrow-link">View full menu <ArrowIcon /></a></div>
        </section>

        <section className="feature-section">
          <div className="feature-backdrop" />
          <div className="feature-image-wrap"><img className="feature-image parallax-image" src={asset('dish-closeup.jpg')} alt="Charred paneer and seasonal vegetables on a black plate" loading="lazy" /></div>
          <div className="feature-content reveal"><p className="eyebrow">The signature sentence</p><h2>The dish<br /><em>you'll remember.</em></h2><p>Fire-kissed paneer. Market vegetables. A plate that arrives like a plot twist — and lingers long after the last bite.</p><a href="#reservation" className="button button-light magnetic">Taste the story <ArrowIcon /></a></div>
          <div className="feature-label">Chef’s selection <span>01 / 04</span></div>
          <div className="feature-word">flavour</div>
        </section>

        <section id="gallery" className="gallery-section section-pad">
          <div className="section-topline reveal"><span>03 — Inside the cell</span><span>Look closer</span></div>
          <div className="gallery-heading reveal"><p className="eyebrow">The cell</p><h2>Come for the <em>story.</em><br />Stay for the details.</h2><p>Look around. Every corner has been designed to make the unusual feel unforgettable.</p></div>
          <div className="gallery-grid">
            {galleryItems.map((item, index) => <button key={item.title} className={`gallery-card ${item.className} reveal`} onClick={() => openLightbox(index)} aria-label={`Open ${item.title} image`}><img className="parallax-image" src={item.image} alt={item.title} loading="lazy" /><span className="gallery-overlay"><i>{item.meta}</i><strong>{item.title}</strong><b>View +</b></span></button>)}
          </div>
        </section>

        <section id="about" className="why-section section-pad">
          <div className="section-topline reveal"><span>04 — The charge sheet</span><span>No objections</span></div>
          <div className="why-heading reveal"><p className="eyebrow">Why Kaidi Kitchen?</p><h2>Not just a meal.<br /><em>An alibi.</em></h2></div>
          <div className="why-list">
            {whyCards.map((card) => <article className="why-card reveal" key={card.index}><span>{card.index}</span><div><h3>{card.title}</h3><p>{card.text}</p></div><ArrowIcon /></article>)}
          </div>
        </section>

        <section id="contact" className="location-section">
          <div className="location-map-texture" />
          <div className="location-grid section-pad">
            <div className="location-copy reveal"><p className="eyebrow">05 — Find your way in</p><h2>Your cell<br /><em>awaits.</em></h2><p className="location-blurb">Leave the ordinary at the door. We’ll take care of the rest.</p><a href="https://maps.google.com/?q=Park+Street+Kolkata" target="_blank" rel="noreferrer" className="button button-light magnetic">Get directions <ArrowIcon /></a></div>
            <div className="location-details reveal"><div className="detail-block"><span>Address</span><strong>14, The Culinary Quarter<br />Park Street, Kolkata 700016</strong></div><div className="detail-block"><span>Opening hours</span><strong>Mon — Sun<br />12:00 noon — 11:00 pm</strong></div><div className="detail-block"><span>Contact</span><strong>+91 90000 00000<br />hello@kaidikitchen.in</strong></div></div>
          </div>
          <div className="map-coordinates">22°33'26.3&quot;N <span>·</span> 88°21'53.2&quot;E</div>
          <div className="location-crosshair"><span /><i /></div>
        </section>

        <section id="reservation" className="reservation-section section-pad">
          <div className="bars" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>
          <div className="reservation-content reveal"><p className="eyebrow">06 — Your move</p><h2>Ready to<br /><em>enter?</em></h2><p>Bring your appetite. Leave your expectations.</p><div className="reservation-actions"><a href="mailto:reservations@kaidikitchen.in" className="button button-light magnetic">Reserve a table <ArrowIcon /></a><a href="#menu" className="button button-quiet">View menu <ArrowIcon /></a></div></div>
          <div className="reservation-mark">KK</div>
        </section>
      </main>

      <footer className="site-footer section-pad">
        <div className="footer-top"><a className="footer-wordmark" href="#top">Kaidi <em>Kitchen</em><span>Pure vegetarian dining</span></a><p>Guilty of<br /><em>great food.</em></p></div>
        <div className="footer-bottom"><div className="footer-links"><a href="#gallery">Instagram</a><a href="#gallery">Facebook</a><a href="#contact">Contact</a><a href="#contact">Location</a><a href="#menu">Menu</a></div><span>© 2024 Kaidi Kitchen. All rights reserved.</span><span>Designed for the curious.</span></div>
      </footer>

      {lightboxIndex !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Gallery lightbox" onClick={closeLightbox}><button className="lightbox-close" onClick={closeLightbox} aria-label="Close gallery">×</button><button className="lightbox-arrow lightbox-prev" onClick={(event) => { event.stopPropagation(); previousLightbox() }} aria-label="Previous image">←</button><figure onClick={(event) => event.stopPropagation()}><img src={galleryItems[lightboxIndex].image} alt={galleryItems[lightboxIndex].title} /><figcaption><span>{galleryItems[lightboxIndex].meta}</span><strong>{galleryItems[lightboxIndex].title}</strong></figcaption></figure><button className="lightbox-arrow lightbox-next" onClick={(event) => { event.stopPropagation(); nextLightbox() }} aria-label="Next image">→</button></div>}
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
