const contact = require("../model/contactModel.js")

exports.createContactController = async(req,res)=>{
    try {
         
        const { name , gender , email , mobile , age , address } = req.body;

        if(!name || !gender || !email || !mobile || !age || !address){
            return res.status(400).json({
                message : "name , gender , email , mobile , age , address are required",
                success : false,
                error : true 
            })
        }

        const newContact = await contact.create({
            name , gender , email , mobile , age , address
        })

        await newContact.save();

        return res.status(201).json({
            message : "contact are created successfully",
            data : newContact,
            success : true ,
            error : false,
        })


    } catch (error) {
        return res.status(500).json({
            message : error.message || "server Error ",
            success : false ,
            error : true 
        })
        
    }
}

exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await contact.find().sort({ createdAt: -1 });
    if (!contacts.length) {
      return res.status(404).json({
        success: false,
        message: "No contacts found",
      });
    }

    return res.status(200).json({
      success: true,
      data: contacts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

exports.updatedCOntroller = async(req,res)=>{
    try {
        const {_id, name , gender , email , mobile , age , address} = req.body
        console.log(_id)
    
  if (!_id) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Contact ID (_id) is required for updating",
      });
    }

    if (!name || !gender || !email || !mobile || !age || !address) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "All fields (name, gender, email, mobile, age, address) are required",
      });
    }

    const updatedContact = await contact.findByIdAndUpdate(_id , 
        {name , gender , email , mobile , age , address},
        {new : true}
       
    )

    if(!updatedContact){
        return res.status(404).json({
            message : "contact not found",
            success : false ,
            error : true
        })
    }

    return res.status(200).json({
        success : true,
        error : false ,
        message : "contact updated successfully ",
        data : updatedContact
    })
       
    } catch (error) {
        return res.status(500).json({
            message : error.message || "server error",
            success : false ,
            error : true
        })
        
    }
}

exports.deleteupdateController = async(req,res)=>{
    try {
        
        const {_id} = req.body;


    } catch (error) {
        return res.status(500).json({
            message : error.message || error ,
            success : false,
            error : true 
        })
        
    }
}
