import {Service} from 'typedi'
import puppeteer from 'puppeteer-extra'
import AdblockerPlugin from 'puppeteer-extra-plugin-adblocker'
import {Browser} from 'puppeteer'

@Service()
export class PuppeteerService {
    private browser: Browser

    public sleep(time: number):  Promise<string> {
        return new Promise(res => setTimeout(res, time, 'done sleeping'));
    }

    public async getWeb(text: string): Promise<string> {
        await this.setup()
        const page = await this.browser.newPage()
        try {
            await page.goto(`https://translate.google.com/?sl=en&tl=vi&text=${encodeURIComponent(text)}`)
            await this.sleep(Math.random() * 2_000)
            await page.waitForSelector('div[data-language-name=Vietnamese]', { timeout: 10000 })
            await this.sleep(Math.random() * 2_000)
            return await page.evaluate(() => document.querySelector('div[data-language-name=Vietnamese]').getAttribute('data-text'))
        } catch (e) {
            console.log(e)
        } finally {
            await page.close()
        }
        return text
    }

    private async setup(): Promise<void> {
        if (!this.browser) {

            puppeteer.use(AdblockerPlugin({
                blockTrackers: true,
            }))
            // puppeteer.use(StealthPlugin())

            // Launch Browser
            this.browser = await puppeteer.launch({
                headless: true,
                executablePath: '/usr/bin/chromium-browser',
                args: [
                    '--disable-gpu',
                    '--disable-dev-shm-usage',
                    '--disable-setuid-sandbox',
                    '--no-sandbox',
                ]
            })
        }
    }
}
