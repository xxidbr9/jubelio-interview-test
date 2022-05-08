import 'tailwindcss/tailwind.css'
import 'swiper/swiper.scss'
import 'swiper/components/navigation/navigation.scss'
import 'swiper/components/pagination/pagination.scss'
import 'swiper/components/scrollbar/scrollbar.scss'
import 'react-spring-bottom-sheet/dist/style.css'
import '@assets/scss/swiper.scss'

// END CSS
import React from 'react'
import { AppContext } from 'next/app'
import { ThemeProvider } from '@emotion/react'
import { ThemeProvider as NextTheme } from 'next-themes'
import { createBreakpoint } from 'react-use'
import { useEffect } from 'react'
import { useDispatch, useStore } from 'react-redux'
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  Thumbs,
} from 'swiper'
import moment from 'moment'
import 'moment/locale/id'
import NProgress from 'nextjs-progressbar'
import { persistor, wrapper } from '@redux-state/index'
import Meta from '@atoms/Meta'
import { breakScreen } from '@styles/breakpoint'
import colors from '@styles/colors'
import gridConfig from '@configs/grid.config'
import { screenAction } from '@rdxFeatures/screen'
import { ScreenType } from '@utils/types/screen'
import { PersistGate } from 'redux-persist/integration/react'
import Loader from '@atoms/Loader'



/* Configuration Start */
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay, Thumbs])
const useScreen = createBreakpoint({ ...breakScreen } as {})
moment.locale("id")
/* Configuration End */

const MainApp = ({ Component, pageProps }) => {
  const theme = {
    ...gridConfig,
  }


  const dispatch = useDispatch()
  const screen = useScreen()

  useEffect(() => {
    dispatch(screenAction.setScreenSize(screen as ScreenType))
  }, [screen, dispatch])


  return (
    <NextTheme
      attribute='class'
      defaultTheme='system'
      enableSystem={false}
      disableTransitionOnChange
    >
      <Meta />
      <NProgress color={colors?.['red'][500] as string} options={{ showSpinner: false }} />
      <ThemeProvider theme={theme}>
        {typeof window !== "undefined" ? (
          <PersistGate persistor={persistor} loading={<Loader />}>
            <Component {...pageProps} />
          </PersistGate>
        ) :
          <Component {...pageProps} />}
      </ThemeProvider>
    </NextTheme>
  )
}

MainApp.getInitialProps = wrapper.getInitialAppProps(
  store =>
    async ({ Component, ctx }: AppContext) => {
      return {
        pageProps: {
          ...(Component.getInitialProps
            ? await Component.getInitialProps({ ...ctx, store })
            : {}),
          pathname: ctx.pathname,
        },
        creator: {
          url: 'https://github.com/xxidbr9',
          name: 'Barnando Akbarto Hidaytullah',
          email: 'barnando13@gmail.com',
        },
      }
    }
)

export default wrapper.withRedux(MainApp)
