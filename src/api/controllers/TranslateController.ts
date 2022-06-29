import {Get, JsonController, QueryParam} from 'routing-controllers'
import {Service} from 'typedi'
import {CommonDTO} from './dto/CommonDTO'
import {PuppeteerService} from '../services/PuppeteerService'

@JsonController('')
@Service()
export class TranslateController {

    constructor(
        private puppeteerService: PuppeteerService
    ) {
    }

    @Get('/translate')
    public async search(@QueryParam('text') text: string): Promise<CommonDTO<string>> {
        console.log(text)
        const content = await this.puppeteerService.getWeb(text)
        return new CommonDTO<string>('SUCCESS', content)
    }

}
