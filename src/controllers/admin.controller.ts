import { Controller, Patch, Param } from '@nestjs/common';
import { AdminService } from '../services/admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Patch('approve/:id')
  approveBorrowRequest(@Param('id') borrowRequestId: string) {
    return this.adminService.approveBorrowRequest(borrowRequestId);
  }

  @Patch('reject/:id')
  rejectBorrowRequest(@Param('id') borrowRequestId: string) {
    return this.adminService.rejectBorrowRequest(borrowRequestId);
  }
}
