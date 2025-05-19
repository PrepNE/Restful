import { Request, Response } from "express"
import { catchAsync } from "../utils/catchAsync"
import ParkingRecordService from "../services/parkingrecord.service";



export default class ParkingRecordController {

   public static checkIn = catchAsync(async (req: Request, res: Response) => {
    const { plateNumber, parkingLotId } = req.body;

    const result = await ParkingRecordService.checkIn({ plateNumber, parkingLotId });

    res.status(result.success ? 201 : 400).json(result);
  });


  public static checkOut = catchAsync(async (req: Request, res: Response) => {
    const { plateNumber } = req.body;

    const result = await ParkingRecordService.checkOut({ plateNumber });

    res.status(result.success ? 200 : 400).json(result);
  });

  public static getVehicleHistory = catchAsync(async (req: Request, res: Response) => {
    const { plateNumber } = req.params;

    const result = await ParkingRecordService.getVehicleHistory(plateNumber);

    res.status(result.success ? 200 : 404).json(result);
  });

  public static searchRecord = catchAsync(async(req: Request , res: Response) => {
    const { plateNumber, nationalId, parkingLotId } = req.query;

    const result = await ParkingRecordService.searchRecords({
      plateNumber: plateNumber as string,
      nationalId: nationalId as string,
      parkingLotId: parkingLotId as string,
    });

    res.status(200).json(result);
  })
}