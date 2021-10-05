import Document, {Html, Head, Main, NextScript} from 'next/document';
import { ColorModeScript } from "@chakra-ui/react"
import { theme } from '../styles/theme'

export default class MyDocument extends Document {
    render() {
        return(
            <Html>
                <Head>
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;600;800&display=swap" rel="stylesheet" />
                    <link rel="shortcut icon" href="/favicon.png" type="image/png" />
                </Head>
                <body>
                    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
                    <Main/>
                    <NextScript/>
                </body>
            </Html>
        );
    }
}