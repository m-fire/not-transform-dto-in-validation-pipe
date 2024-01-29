import { ImageEntity } from '@src-module/file/domain'

export abstract class ImageOutputPort {
    abstract save(image: ImageEntity): Promise<ImageEntity>

    abstract saveAll(...images: ImageEntity[]): Promise<ImageEntity[]>

    abstract findAllByOwnerId(boardNumber: string): Promise<ImageEntity[]>

    abstract deleteAll(...images: ImageEntity[]): Promise<void>

    abstract saveOrUpdate(...images: ImageEntity[]): Promise<SaveOrUpdateReturn>
}

export type SaveOrUpdateReturn = { sequences: ImageEntity['sequence'][] }
