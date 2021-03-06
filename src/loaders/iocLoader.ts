import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec'
import { useContainer as routingUseContainer } from 'routing-controllers'
import { Container } from 'typedi'

export const iocLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    routingUseContainer(Container)
}
