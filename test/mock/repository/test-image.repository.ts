import { NumberIdMemoryRepository } from '@src-support/infra/data/repository'
import {
    ImageOutputPort,
    SaveOrUpdateReturn,
} from '@src-module/file/image.output.port'
import { ImageEntity } from '@src-module/file/domain'

export class TestImageRepository
    extends NumberIdMemoryRepository<ImageEntity>
    implements ImageOutputPort
{
    async findAllByOwnerId(ownerId: string): Promise<ImageEntity[]> {
        return Array.from(this.persistence.values()).filter(
            (value) => value.ownerId === ownerId,
        )
    }

    async saveOrUpdate(...images: ImageEntity[]): Promise<SaveOrUpdateReturn> {
        const saves = await this.saveAll(...images)
        return { sequences: Array.from(saves).map((e) => e.id) }
    }
}
