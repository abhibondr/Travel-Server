const { encrypt } = require("../helpers/encryption");
const DestinationModel = require("../models/destinations.model");
const _ = require("lodash");

const destinationCtrl = {
  createDestination(req, res) {
    let data = req.body;

    console.log("Files ", req.files);
    console.log("File ", req.file);

    if (req.files) {
      var files = req?.files?.map((file) =>
        file?.filename ? `places/${file?.filename}` : ""
      );
    }

    DestinationModel.insertMany({ ...data, images: files })
      .then((result) => {
        console.log("Saved: ", result);
        res.status(201).send({
          message: "Destination Created",
          data: result,
        });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .send({ message: "Could not created the destination", error: err });
      });
  }, //createdestination

  updateDestination(req, res) {
    const { id } = req.params;
    const destination = req.body;

    if (req?.file) {
      destination.avatar = `places/${req.file?.filename}`;
    }

    DestinationModel.findOneAndUpdate({ _id: id }, destination, { new: true })
      .then((result) => {
        if (!result) throw new Error("destination not updated");
        res.status(200).send({
          message: "Destination updated",
          data: result,
        });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(404)
          .send({ message: "Could not updated the destination", error: err });
      });
  }, //updatedestination

  deleteDestination(req, res) {
    const { id } = req.params;
    DestinationModel.findOneAndDelete({ _id: id })
      .then((result) => {
        res.status(200).send({
          message: "destination deleted",
          data: result,
        });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(404)
          .send({ message: "Destination not available", error: err });
      });
  }, //deletedestination

  fetchOneDestination(req, res) {
    const { id } = req.params;
    DestinationModel.findOne({ _id: id })
      .then((result) => {
        if (!result) throw new Error("destination not available");
        res.status(200).send({
          message: "Destination available",
          data: result,
        });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(404)
          .send({ message: "Destination not available", error: err });
      });
  }, //fetchOnedestination

  async fetchAllDestinations(req, res) {
    // http://localhost:9999/api/destinations?perPage=10&pageNo=1
    const { perPage = 10, pageNo = 1, category, q } = req.query;

    // TotalDestinationListing = 100
    // perPage = 10
    // totalPages=7
    //  pageNo = 2

    //pageNo=2
    //result.skip(15*2).limit(15)

    //pageNo=4
    //result.skip(15*3).limit(15)

    //result.skip(perPage * (pageNo - 1)).limit(perPage)

    const filter = {
      $or: [{ status: 0 }, { status: 1 }],
    };

    const { status } = req.query;

    if (status) filter.status = status;
    if (q) filter.name = new RegExp(q, "gi");
    else if (category) {
      if (category !== "all") {
        filter.category = new RegExp(category, "gi");
      }
    }

    // const totalDesti = await DestinationModel.countDocuments(filter);

    // console.log("Count Result: ", rr);

    DestinationModel.find(filter)
      .skip(perPage * (pageNo - 1))
      // .limit(perPage)
      .then((result) => {
        if (!result) throw new Error("destination not available");

        res.status(200).send({
          message: "Destination available",
          data: result,
          // data: {
          //   total: totalDesti,
          //   items: result,
          // },
        });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(404)
          .send({ message: "Destination not available ", error: err });
      });
  }, //fetchAlldestinations
};

module.exports = destinationCtrl;
