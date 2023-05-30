const db = require("../models");

const Book = db.book;
const Op = db.Sequelize.Op;

// Create Book Method
exports.create = (req, res) => {
  console.log(">> book controller api");
  // Validate request
  if (!req.body.nama) {
    res.status(400).send({
      message: "Content can't be empty!",
    });
    return;
  }

  console.log(">> create book object");
  // create book object
  const book = {
    nama: req.body.nama,
    tempat_lahir: req.body.tempat_lahir,
    tanggal_lahir: req.body.tanggal_lahir,
    alamat: req.body.alamat,
  };

  // save book to database
  Book.create(book)
    .then((data) => {
      console.log(">> insert book successfully");
      res.send(data);
    })
    .catch((err) => {
      console.log(">> insert book fail");
      res.status(500).send({
        message: "Error occurred while inserting book.",
      });
    });
};

// Retrieve all Books from the database
exports.findAll = (req, res) => {
  Book.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error while retrieving books",
      });
    });
};

// Find a single Books with an id
exports.findOne = (req, res) => {
  Book.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error while finding book",
      });
    });
};

//Delete a single Books with an id
exports.delete = (req, res) => {
  Book.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(
      res.send({
        message: `Succes delete book with id = ${req.params.id}!`,
      })
    )
    .catch((err) => {
      res.status(500).send({
        message: `Could't delete book with id = ${req.params.id}!`,
      });
    });
};

// Update Books
exports.update = (req, res) => {
  // Validate request
  if (!req.body.nama) {
    res.status(400).send({
      message: "Content can't be empty!",
    });
    return;
  }
  if (!req.body.tempat_lahir) {
    res.status(400).send({
      message: "Author can't be empty!",
    });
    return;
  }
  if (!req.body.tanggal_lahir) {
    res.status(400).send({
      message: "Release date can't be empty!",
    });
    return;
  }
  if (!req.body.alamat) {
    res.status(400).send({
      message: "Subject can't be empty!",
    });
    return;
  }

  Book.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      data.nama = req.body.nama;
      data.tempat_lahir = req.body.tempat_lahir;
      data.tanggal_lahir = req.body.tanggal_lahir;
      data.alamat = req.body.alamat;
      data.save();

      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error while finding book",
      });
    });
};

exports.patch = (req, res) => {
  Book.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      if (req.body.nama) {
        data.nama = req.body.nama;
      }
      if (req.body.tempat_lahir) {
        data.tempat_lahir = req.body.tempat_lahir;
      }
      if (req.body.tanggal_lahir) {
        data.tanggal_lahir = req.body.tanggal_lahir;
      }
      if (req.body.alamat) {
        data.alamat = req.body.alamat;
      }
      data.save();
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error while finding book",
      });
    });
};
