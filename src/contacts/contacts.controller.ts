import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto, UpdateContactDto } from './dto/createContact.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) { }

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() createContactDto: CreateContactDto) {
    return this.contactsService.createContact(createContactDto);
  }

  @Put()
  @UseGuards(AuthGuard)
  async update(
    @Body() updateContactDto: UpdateContactDto,
  ) {
    return this.contactsService.updateSingleContact(updateContactDto);
  }
  @Get()
  async getAllContacts() {
    return this.contactsService.getAllContacts();
  }

  @Get(':id')
  async getContactById(@Param('id') id: string) {
    return this.contactsService.getContactById(id);
  }
}
