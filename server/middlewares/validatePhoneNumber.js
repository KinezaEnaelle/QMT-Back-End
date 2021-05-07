const validateNumberByCountry = (req, res, next) => {
    const { country, phoneNumber } = req.body;
    const rwandaExp = new RegExp(/^2507[2,3,8][0-9]{7}/);
    const ugandaExp = new RegExp (/^2567[0,5,7,8][0-9]{7}/);
    const tanzaniaExp = new RegExp (/^255[62,65,75,78][0-9]{8}/);
    const kenyaExp = new RegExp (/^2547[0,1,2,9][0-9]{7}/);
    const burundiExp = new RegExp (/^257[61,62,68,69,71,72,75,76,77,79][0-9]{7}/);
    if (country === 'RWANDA'){
        if (rwandaExp.test(phoneNumber)) {
            return next();
        }
        return res.status(400).json({
            status: 400,
            error: 'invalid phone number for the selected country'
        });
    }

    if (country === 'UGANDA' ){
            if(ugandaExp.test(phoneNumber)) {
                return next();
            }
            return res.status(400).json({
                status: 400,
                error: 'invalid phone number for the selected country'
            });
    }

    if (country === 'BURUNDI'){
        if(burundiExp.test(phoneNumber)) {
            return next();
        }
        return res.status(400).json({
            status: 400,
            error: 'invalid phone number for the selected country'
        });
    }
    if (country === 'TANZANIA'){
        if(tanzaniaExp.test(phoneNumber)) {
            return next();
        }
        return res.status(400).json({ 
            status: 400,
            error: 'invalid phone number for the selected country'
        });
    }
    if (country === 'KENYA'){
        if(kenyaExp.test(phoneNumber)) {
            return next();
        }
        return res.status(400).json({
            status: 400,
            error: 'invalid phone number for the selected country'
        });
    }
    return res.status(400).json({
        status: 400,
        error: 'no country specified'
    });
};

export default validateNumberByCountry;
