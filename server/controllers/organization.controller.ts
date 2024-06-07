import { ModelNameEnum } from "@server/models";
import { OrganizationModelSchema } from "@server/models/organization.model";
import DbService from "@server/services/db.service";
import { ResponseI } from "@server/types/ResponseI";
import { ResponseStatusEnum } from "@server/types/enums/ResponseStatusEnum";
import { SchemaInferred } from "@src/types/SchemaInferred";
import { Timestamp } from "firebase/firestore";
import { z } from "zod";

// Input validation, sanitization, and role validation
class OrganizationController {
  private dbService: DbService<OrganizationModelSchema>;
  constructor() {
    this.dbService = new DbService<OrganizationModelSchema>(ModelNameEnum.ORGANIZATION);
  }

  public getAll = async () => {
    try {
      const items = await this.dbService.getItems();
      // Filters by creation date in DESC order
      const orgItems = items.docs.map((item) => {
        const itemData = item.data() as OrganizationModelSchema;
        return {
          id: item.id,
          ...itemData,
          createdAt: itemData.createdAt.toDate(),
          updatedAt: itemData.createdAt.toDate()
        } as SchemaInferred<OrganizationModelSchema>;
      });
      return {
        status: ResponseStatusEnum.SUCCESS,
        body: orgItems.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      } as ResponseI<SchemaInferred<OrganizationModelSchema>[]>;
    } catch (err: unknown) {
      return {
        status: ResponseStatusEnum.ERROR,
        body: err
      } as ResponseI<string>;
    }
  };

  public getById = async (orgId: string) => {
    try {
      const item = await this.dbService.getItem(orgId);
      const itemData = item.data() as OrganizationModelSchema;
      if (!itemData) {
        throw new Error("Error getting todo item");
      }
      return {
        status: ResponseStatusEnum.SUCCESS,
        body: {
          id: item.id,
          ...itemData,
          createdAt: itemData.createdAt.toDate(),
          updatedAt: itemData.updatedAt.toDate()
        }
      } as ResponseI<SchemaInferred<OrganizationModelSchema>>;
    } catch (err: unknown) {
      return {
        status: ResponseStatusEnum.ERROR,
        body: err
      } as ResponseI<string>;
    }
  };

  public create = async (name: string, description: string, email: string) => {
    try {
      // TODO: Add Zod validation
      const orgSchema = z.object({
        name: z.string().max(50),
        description: z.string(),
        email: z.string().email()
      });

      orgSchema.parse({ name, description, email });
      const newOrganization: OrganizationModelSchema = {
        name,
        description,
        email,
        memberNumber: 0,
        tokens: 0,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      };
      const itemRef = await this.dbService.addItem(newOrganization);
      const item = await this.dbService.getItem(itemRef.id);
      const itemData = item.data() as OrganizationModelSchema;
      if (!itemData) {
        throw new Error("Error creating organization");
      }

      return {
        status: ResponseStatusEnum.SUCCESS,
        body: {
          id: itemRef.id,
          ...itemData,
          createdAt: itemData.createdAt.toDate(),
          updatedAt: itemData.updatedAt.toDate()
        }
      } as ResponseI<SchemaInferred<OrganizationModelSchema>>;
    } catch (err: unknown) {
      return {
        status: ResponseStatusEnum.ERROR,
        body: err
      } as ResponseI<string>;
    }
  };

  public update = async (id: string, userId: string, updatedInfo: SchemaInferred<OrganizationModelSchema>) => {
    try {
      const item = await this.dbService.getItem(id);
      const itemData = item.data() as OrganizationModelSchema;

      if (!itemData) {
        throw new Error("Document not found");
      } else if (item.id !== userId) {
        throw new Error("Not authorized to update this item");
      }

      const updatedItem: OrganizationModelSchema = {
        ...updatedInfo,
        updatedAt: Timestamp.now(),
        createdAt: itemData.createdAt
      };

      await this.dbService.updateItem(id, updatedItem);
      return {
        status: ResponseStatusEnum.SUCCESS,
        body: id
      } as ResponseI<string>;
    } catch (err: unknown) {
      return {
        status: ResponseStatusEnum.ERROR,
        body: err
      } as ResponseI<string>;
    }
  };

  public delete = async (id: string, userId: string) => {
    try {
      const item = await this.dbService.getItem(id);
      if (item.id !== userId) {
        throw new Error("Not authorized to delete this item");
      }
      await this.dbService.deleteItem(id);
      return {
        status: ResponseStatusEnum.SUCCESS,
        body: id
      } as ResponseI<string>;
    } catch (err: unknown) {
      return {
        status: ResponseStatusEnum.ERROR,
        body: err
      } as ResponseI<string>;
    }
  };
}

const organizationController = new OrganizationController();
export default organizationController;
