import { ApiProperty } from '@nestjs/swagger';

export class Bookmark {
    @ApiProperty({ example: "Math", description: 'Event title' })
    title: string;

    @ApiProperty({ example: "Math lesson", description: 'Event description' })
    description: string;

    @ApiProperty({ example: "2023-01-02T12:00:00Z", description: 'Date of event creation' })
    createdDate: string;

    @ApiProperty({ example: "2023-01-02T12:00:00Z", description: 'Date of event update' })
    updatedDate: string;

    @ApiProperty({ example: "2023-01-02T12:00:00Z", description: 'Time of event start' })
    timeFrom: string;

    @ApiProperty({ example: "2023-01-02T12:00:00Z", description: 'Time of event end' })
    timeTo: string;

    @ApiProperty({ example: "2023-01-02T12:00:00Z", description: 'Date of event start' })
    dateFrom: string;

    @ApiProperty({ example: "2023-01-02T12:00:00Z", description: 'Date of event end' })
    dateTo: string;

    @ApiProperty({ example: 1, description: 'The user identifier' })
    userId: number;
}
