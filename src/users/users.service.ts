import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as bcrypt from "bcryptjs";
import { Model } from "mongoose";
import { BaseService } from "src/utils/base-services";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./schema/user.schema";

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(
    @InjectModel(User.name) protected readonly userModel: Model<User>
  ) {
    super(userModel);
  }

  async create(createUserDto: CreateUserDto): Promise<User | any> {
    try {
      if (createUserDto.password !== createUserDto.confirmPassword) {
        throw new BadRequestException("Passwords do not match!");
      }

      const hashedPassword = await bcrypt.hash(createUserDto.password, 12);

      const newUser = new this.userModel({
        username: createUserDto.username,
        email: createUserDto.email,
        password: hashedPassword,
        role_id: createUserDto.role_id,
        deleted: false,
      });
      return await newUser.save();
    } catch (error) {
      return { success: false, error: true, msg: error.message };
    }
  }

  async findAll(): Promise<User[] | any> {
    try {
      const users: User[] = await this.userModel
        .find({}, { _v: 0, password: 0 })
        .populate("role_id");
      return users;
    } catch (error) {
      return { success: false, error: true, msg: error.message };
    }
  }

  async findByEmail(email: string): Promise<User | any> {
    try {
      return (await this.userModel.findOne({ email: email })).populate(
        "role_id"
      );
    } catch (error) {
      return { success: false, error: true, msg: error.message };
    }
  }

  async findByUsername(username: string): Promise<User | any> {
    try {
      return await this.userModel
        .findOne({ username: username })
        .populate("role_id")
        .lean();
    } catch (error) {
      return { success: false, error: true, msg: error.message };
    }
  }

  async findOne(id: string): Promise<User | any> {
    try {
      return await this.userModel.findById(id).populate("role_id");
    } catch (error) {
      return { success: false, error: true, msg: error.message };
    }
  }

  async updatePassword(
    id: string,
    updateUserDto: UpdateUserDto
  ): Promise<User | any> {
    try {
      if (updateUserDto.newPassword !== updateUserDto.confirmPassword) {
        throw new BadRequestException("Passwords do not match!");
      }

      const userFind: User | any = await this.userModel.findById(id);

      if (!userFind) {
        throw new BadRequestException("User do not exists!");
      }

      if (
        !(await bcrypt.compare(updateUserDto.oldPassword, userFind.password))
      ) {
        throw new BadRequestException("Invalid password!");
      }

      const hashedPassword = await bcrypt.hash(updateUserDto.newPassword, 10);
      const passChanged = await this.userModel.findOneAndUpdate(
        { _id: userFind._id },
        {
          password: hashedPassword,
        },
        { new: true }
      );
      return passChanged;
    } catch (error) {
      return { success: false, error: true, msg: error.message };
    }
  }

  async enable(id: string): Promise<User | any> {
    try {
      const enableUser = await this.userModel.findOneAndUpdate(
        { _id: id },
        {
          deleted: false,
        },
        { new: true }
      );
      return enableUser;
    } catch (error) {
      return { success: false, error: true, msg: error.message };
    }
  }

  async delete(id: string): Promise<any> {
    try {
      const deletedUser = await this.userModel.findOneAndUpdate(
        { _id: id },
        {
          deleted: true,
        },
        { new: true }
      );
      return deletedUser;
    } catch (error) {
      return { success: false, error: true, msg: error.message };
    }
  }
}
