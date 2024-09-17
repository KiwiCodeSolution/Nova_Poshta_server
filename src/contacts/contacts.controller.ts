import { Body, Controller, Param, Post, Put, Query } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto, UpdateContactDto } from './dto/createContact.dto';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  async create(@Body() createContactDto: CreateContactDto) {
    return this.contactsService.createContact(createContactDto);
  }

  @Put()
  async update(
    
    @Body() updateContactDto: UpdateContactDto,
  ) {
    return this.contactsService.updateSingleContact( updateContactDto);
  }
}
