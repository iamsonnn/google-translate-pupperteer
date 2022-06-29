export type ProcessStatus = 'SUCCESS' | 'ERROR'

export class CommonDTO<T> {
    constructor(
        public code: ProcessStatus,
        public data: T,
        public description?: string,
    ) {
        if (!description) {
            this.description = code
        }
    }

}
