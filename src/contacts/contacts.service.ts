import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contacts } from './schemas/contacts.schemas';
import { CreateContactDto , UpdateContactDto} from './dto/createContact.dto';


@Injectable()
export class ContactsService {
  constructor(
    @InjectModel(Contacts.name) private readonly contactsModel: Model<Contacts>,
  ) {}

  async createContact(createContactDto: CreateContactDto): Promise<Contacts> {
    const createdContact = new this.contactsModel(createContactDto);
    return createdContact.save();
  }

  async updateContactByField(field: string, value: string, updateContactDto: UpdateContactDto): Promise<Contacts> {
    const updateFields = { [field]: value };
    const updatedContact = await this.contactsModel.findOneAndUpdate(
      updateFields,
      updateContactDto,
      {
        new: true,
        runValidators: true,
      },
    ).exec();

    if (!updatedContact) {
      throw new NotFoundException(`Contact with ${field} ${value} not found`);
    }

    return updatedContact;
  }
}
