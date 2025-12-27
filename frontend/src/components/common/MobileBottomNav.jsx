import { useLocation, useNavigate } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'
import './MobileBottomNav.css'

function MobileBottomNav() {
  const location = useLocation()
  const navigate = useNavigate()
  const { language } = useLanguage()

  const texts = {
    uz: {
      home: 'Bosh sahifa',
      today: 'Bugun',
      menu: 'Menyu',
      calendar: 'Taqvim',
      more: 'Ko\'proq'
    },
    ru: {
      home: 'Главная',
      today: 'Сегодня',
      menu: 'Меню',
      calendar: 'Календарь',
      more: 'Ещё'
    },
    en: {
      home: 'Home',
      today: 'Today',
      menu: 'Menu',
      calendar: 'Calendar',
      more: 'More'
    }
  }
  const txt = texts[language] || texts.uz

  const navItems = [
    { path: '/', icon: '🏠', label: txt.home },
    { path: '/today', icon: '📖', label: txt.today },
    { path: '/menu', icon: '🍽️', label: txt.menu },
    { path: '/calendar', icon: '📅', label: txt.calendar },
    { path: '/more', icon: '☰', label: txt.more, isMore: true }
  ]

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  // Don't show on admin pages
  if (location.pathname.startsWith('/admin')) {
    return null
  }

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobil navigatsiya">
      {navItems.map(item => (
        <button
          key={item.path}
          className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
          aria-label={item.label}
          aria-current={isActive(item.path) ? 'page' : undefined}
          onClick={() => {
            if (item.isMore) {
              // Toggle more menu
              const moreMenu = document.querySelector('.more-menu')
              if (moreMenu) {
                moreMenu.classList.toggle('show')
              }
            } else {
              navigate(item.path)
            }
          }}
        >
          <span className="nav-icon" aria-hidden="true">{item.icon}</span>
          <span className="nav-label">{item.label}</span>
        </button>
      ))}

      {/* More Menu Popup */}
      <div className="more-menu">
        <div className="more-menu-content">
          <button onClick={() => { navigate('/about'); document.querySelector('.more-menu')?.classList.remove('show') }}>
            <span>ℹ️</span> {language === 'uz' ? 'Biz haqimizda' : 'О нас'}
          </button>
          <button onClick={() => { navigate('/staff'); document.querySelector('.more-menu')?.classList.remove('show') }}>
            <span>👨‍💼</span> {language === 'uz' ? 'Xodimlar' : 'Сотрудники'}
          </button>
          <button onClick={() => { navigate('/gallery'); document.querySelector('.more-menu')?.classList.remove('show') }}>
            <span>🖼️</span> {language === 'uz' ? 'Galereya' : 'Галерея'}
          </button>
          <button onClick={() => { navigate('/curriculum'); document.querySelector('.more-menu')?.classList.remove('show') }}>
            <span>📚</span> {language === 'uz' ? "O'quv dasturi" : 'Программа'}
          </button>
          <button onClick={() => { navigate('/games'); document.querySelector('.more-menu')?.classList.remove('show') }}>
            <span>🎮</span> {language === 'uz' ? "O'yinlar" : 'Игры'}
          </button>
          <button onClick={() => { navigate('/library'); document.querySelector('.more-menu')?.classList.remove('show') }}>
            <span>📖</span> {language === 'uz' ? 'Kutubxona' : 'Библиотека'}
          </button>
          <button onClick={() => { navigate('/blog'); document.querySelector('.more-menu')?.classList.remove('show') }}>
            <span>📝</span> {language === 'uz' ? 'Blog' : 'Блог'}
          </button>
          <button onClick={() => { navigate('/enrollment'); document.querySelector('.more-menu')?.classList.remove('show') }}>
            <span>📋</span> {language === 'uz' ? "Ro'yxatdan o'tish" : 'Регистрация'}
          </button>
          <button onClick={() => { navigate('/contact'); document.querySelector('.more-menu')?.classList.remove('show') }}>
            <span>📞</span> {language === 'uz' ? 'Aloqa' : 'Контакты'}
          </button>
          <button onClick={() => { navigate('/feedback'); document.querySelector('.more-menu')?.classList.remove('show') }}>
            <span>💬</span> {language === 'uz' ? 'Fikr bildirish' : 'Отзывы'}
          </button>
        </div>
        <div className="more-menu-overlay" onClick={() => document.querySelector('.more-menu')?.classList.remove('show')} />
      </div>
    </nav>
  )
}

export default MobileBottomNav
