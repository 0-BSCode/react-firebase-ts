import { ModelNameEnum } from "@server/models";
import { EventModelSchema } from "@server/models/event.model";
import DbService from "@server/services/db.service";
import { ResponseI } from "@server/types/ResponseI";
import { ResponseStatusEnum } from "@server/types/enums/ResponseStatusEnum";
import { EventSchemaInferred, SchemaInferred } from "@src/types/SchemaInferred";
import { Timestamp } from "firebase/firestore";
import { z } from "zod";

// Input validation, sanitization, and role validation
class EventController {
  private dbService: DbService<EventModelSchema>;
  constructor() {
    this.dbService = new DbService<EventModelSchema>(ModelNameEnum.EVENT);
  }

  public getAll = async () => {
    try {
      const items = await this.dbService.getItems();
      // Filters by creation date in DESC order
      const orgItems = items.docs.map((item) => {
        const itemData = item.data() as EventModelSchema;
        return {
          id: item.id,
          ...itemData,
          occurringDate: itemData.occurringDate.toDate(),
          createdAt: itemData.createdAt.toDate(),
          updatedAt: itemData.createdAt.toDate()
        } as EventSchemaInferred;
      });
      return {
        status: ResponseStatusEnum.SUCCESS,
        body: orgItems.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      } as ResponseI<SchemaInferred<EventModelSchema>[]>;
    } catch (err: unknown) {
      return {
        status: ResponseStatusEnum.ERROR,
        body: err
      } as ResponseI<string>;
    }
  };

  public getByOrgId = async (orgId: string) => {
    try {
      const items = await this.dbService.getItems();
      const filteredItems = items.docs.filter((item) => item.data().ownerId === orgId);
      const orgItems = filteredItems.map((item) => {
        const itemData = item.data() as EventModelSchema;
        return {
          id: item.id,
          ...itemData,
          occurringDate: itemData.occurringDate.toDate(),
          createdAt: itemData.createdAt.toDate(),
          updatedAt: itemData.createdAt.toDate()
        } as EventSchemaInferred;
      });
      return {
        status: ResponseStatusEnum.SUCCESS,
        body: orgItems.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      } as ResponseI<SchemaInferred<EventModelSchema>[]>;
    } catch (err: unknown) {
      return {
        status: ResponseStatusEnum.ERROR,
        body: err
      } as ResponseI<string>;
    }
  };

  public getById = async (eventId: string) => {
    try {
      const item = await this.dbService.getItem(eventId);
      const itemData = item.data() as EventModelSchema;
      if (!itemData) {
        throw new Error("Error getting todo item");
      }
      return {
        status: ResponseStatusEnum.SUCCESS,
        body: {
          id: item.id,
          ...itemData,
          occurringDate: itemData.occurringDate.toDate(),
          createdAt: itemData.createdAt.toDate(),
          updatedAt: itemData.updatedAt.toDate()
        }
      } as ResponseI<EventSchemaInferred>;
    } catch (err: unknown) {
      return {
        status: ResponseStatusEnum.ERROR,
        body: err
      } as ResponseI<string>;
    }
  };

  // TODO: Make arguments shorter
  public create = async (
    title: string,
    description: string,
    orgId: string,
    location: string,
    occurDate: Date,
    requireAttendance: boolean
  ) => {
    try {
      const eventSchema = z.object({
        title: z.string().max(50),
        description: z.string(),
        orgId: z.string(),
        occurDate: z.date(),
        location: z.string(),
        requireAttendance: z.boolean()
      });

      eventSchema.parse({ title, description, orgId, occurDate, requireAttendance });
      const newOrganization: EventModelSchema = {
        title,
        description,
        organizationId: orgId,
        attendeeIds: [],
        completed: false,
        location,
        requireAttendance,
        occurringDate: Timestamp.fromDate(occurDate),
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      };
      const itemRef = await this.dbService.addItem(newOrganization);
      const item = await this.dbService.getItem(itemRef.id);
      const itemData = item.data() as EventModelSchema;
      if (!itemData) {
        throw new Error("Error creating organization");
      }

      return {
        status: ResponseStatusEnum.SUCCESS,
        body: {
          id: itemRef.id,
          ...itemData,
          occurringDate: itemData.occurringDate.toDate(),
          createdAt: itemData.createdAt.toDate(),
          updatedAt: itemData.updatedAt.toDate()
        }
      } as ResponseI<EventSchemaInferred>;
    } catch (err: unknown) {
      return {
        status: ResponseStatusEnum.ERROR,
        body: err
      } as ResponseI<string>;
    }
  };

  public update = async (id: string, userId: string, updatedInfo: SchemaInferred<EventModelSchema>) => {
    try {
      const item = await this.dbService.getItem(id);
      const itemData = item.data() as EventModelSchema;

      if (!itemData) {
        throw new Error("Document not found");
      } else if (item.id !== userId) {
        throw new Error("Not authorized to update this item");
      }

      const updatedItem: EventModelSchema = {
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

const eventController = new EventController();
export default eventController;
