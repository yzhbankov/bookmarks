import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class BookmarksService {
    private readonly logger = new Logger(BookmarksService.name);

    async save(bookmark: any): Promise<any> {
        this.logger.log('Save bookmark ', bookmark);
        return {
            data: {
                title: bookmark.title,
                description: bookmark.description,
                createdDate: new Date(),
                updatedDate: new Date(),
                timeFrom: new Date(),
                timeTo: new Date(),
                dateFrom: new Date(),
                dateTo: new Date(),
                userId: 1
            },
        }
    }

    async read(): Promise<any> {
        return {}
    }
}
