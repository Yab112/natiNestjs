import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BorrowRequest, BorrowRequestDocument } from '../schemas/borrow-request.schema';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(BorrowRequest.name) private borrowRequestModel: Model<BorrowRequestDocument>,
  ) {}

  async approveBorrowRequest(requestId: string) {
    const borrowRequest = await this.borrowRequestModel.findById(requestId);
    if (!borrowRequest) throw new NotFoundException('Borrow request not found');
    
    borrowRequest.status = 'approved';
    await borrowRequest.save();
    
    return borrowRequest;
  }

  async rejectBorrowRequest(requestId: string) {
    const borrowRequest = await this.borrowRequestModel.findById(requestId);
    if (!borrowRequest) throw new NotFoundException('Borrow request not found');
    
    borrowRequest.status = 'rejected';
    await borrowRequest.save();
    
    return borrowRequest;
  }
}
