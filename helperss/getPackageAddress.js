import users from "../models/users.js";


export const getAddress = async (packageType,address) => {
    console.log("hello")
    let upgradePackgeAddress;
    let upgradePackgeAddressData;
    if (packageType == 20) {
        upgradePackgeAddress = await getUplineAddresses(address, 2);
        console.log("upgradePackgeAddress for level 2",upgradePackgeAddress);
        upgradePackgeAddressData = await users.findOne({
            address:upgradePackgeAddress
        })
        console.log("upgradePackgeAddressData.packageBought.includes(packageType)",upgradePackgeAddressData.packageBought.includes(packageType));
        if (!(upgradePackgeAddress && upgradePackgeAddressData.packageBought.includes(packageType))) {
            upgradePackgeAddress = await getUplineAddresses(address, 3);
            upgradePackgeAddressData = await users.findOne({
                address:upgradePackgeAddress
            })
            if (!(upgradePackgeAddress && upgradePackgeAddressData.packageBought.includes(packageType))) {
                upgradePackgeAddress = await getUplineAddresses(address, 4);
                upgradePackgeAddressData = await users.findOne({
                    address:upgradePackgeAddress
                })
                if (!(upgradePackgeAddress && upgradePackgeAddressData.packageBought.includes(packageType))) {
                    upgradePackgeAddress = await getUplineAddresses(address, 5);
                    upgradePackgeAddressData = await users.findOne({
                        address:upgradePackgeAddress
                    })
                    if (!(upgradePackgeAddress && upgradePackgeAddressData.packageBought.includes(packageType))) {
                        upgradePackgeAddress = await getUplineAddresses(address, 6);
                        upgradePackgeAddressData = await users.findOne({
                            address:upgradePackgeAddress
                        })
                        if (!(upgradePackgeAddress && upgradePackgeAddressData.packageBought.includes(packageType))) {
                            upgradePackgeAddress = await getUplineAddresses(address, 7);
                            upgradePackgeAddressData = await users.findOne({
                                address:upgradePackgeAddress
                            })
                            if (!(upgradePackgeAddress && upgradePackgeAddressData.packageBought.includes(packageType))) {
                                upgradePackgeAddress = await getUplineAddresses(address, 8);
                                upgradePackgeAddressData = await users.findOne({
                                    address:upgradePackgeAddress
                                })
                                if (!(upgradePackgeAddress && upgradePackgeAddressData.packageBought.includes(packageType))) {
                                    upgradePackgeAddress = await getUplineAddresses(address, 9);
                                    upgradePackgeAddressData = await users.findOne({
                                        address:upgradePackgeAddress
                                    })
                                    if (!(upgradePackgeAddress && upgradePackgeAddressData.packageBought.includes(packageType))) {
                                        upgradePackgeAddress = await getUplineAddresses(address, 10);
                                        upgradePackgeAddressData = await users.findOne({
                                            address:upgradePackgeAddress
                                        })
                                        if (!(upgradePackgeAddress && upgradePackgeAddressData.packageBought.includes(packageType))) {
                                            upgradePackgeAddress = await getUplineAddresses(address, 11);
                                            upgradePackgeAddressData = await users.findOne({
                                                address:upgradePackgeAddress
                                            })
                                        }else return upgradePackgeAddress;
                                    } else return upgradePackgeAddress;
                                } else return upgradePackgeAddress;
                            } else return upgradePackgeAddress;
                        } else return upgradePackgeAddress;
                    } else return upgradePackgeAddress;
                } else return upgradePackgeAddress;
            } else return upgradePackgeAddress;
        } else return upgradePackgeAddress;

    } else if (packageType == 30) {
        upgradePackgeAddress = await getUplineAddresses(address, 3);
        upgradePackgeAddressData = await users.findOne({
            address:upgradePackgeAddress
        })
        if (!(upgradePackgeAddress && upgradePackgeAddressData.packageBought.includes(packageType))) {
            upgradePackgeAddress = await getUplineAddresses(address, 4);
            upgradePackgeAddressData = await users.findOne({
                address:upgradePackgeAddress
            })
            if (!(upgradePackgeAddress && upgradePackgeAddressData.packageBought.includes(packageType))) {
                upgradePackgeAddress = await getUplineAddresses(address, 5);
                upgradePackgeAddressData = await users.findOne({
                    address:upgradePackgeAddress
                })
                if (!(upgradePackgeAddress && upgradePackgeAddressData.packageBought.includes(packageType))) {
                    upgradePackgeAddress = await getUplineAddresses(address, 6);
                    upgradePackgeAddressData = await users.findOne({
                        address:upgradePackgeAddress
                    })
                    if (!(upgradePackgeAddress && upgradePackgeAddressData.packageBought.includes(packageType))) {
                        upgradePackgeAddress = await getUplineAddresses(address, 7);
                        upgradePackgeAddressData = await users.findOne({
                            address:upgradePackgeAddress
                        })
                        if (!(upgradePackgeAddress && upgradePackgeAddressData.packageBought.includes(packageType))) {
                            upgradePackgeAddress = await getUplineAddresses(address, 8);
                            upgradePackgeAddressData = await users.findOne({
                                address:upgradePackgeAddress
                            })
                            if (!(upgradePackgeAddress && upgradePackgeAddressData.packageBought.includes(packageType))) {
                                upgradePackgeAddress = await getUplineAddresses(address, 9);
                                upgradePackgeAddressData = await users.findOne({
                                    address:upgradePackgeAddress
                                })
                                if (!(upgradePackgeAddress && upgradePackgeAddressData.packageBought.includes(packageType))) {
                                    upgradePackgeAddress = await getUplineAddresses(address, 10);
                                    upgradePackgeAddressData = await users.findOne({
                                        address:upgradePackgeAddress
                                    })
                                    if (!(upgradePackgeAddress && upgradePackgeAddressData.packageBought.includes(packageType))) {
                                        upgradePackgeAddress = await getUplineAddresses(address, 11);
                                        upgradePackgeAddressData = await users.findOne({
                                            address:upgradePackgeAddress
                                        })
                                    }else return upgradePackgeAddress;
                                }else return upgradePackgeAddress;
                            }else return upgradePackgeAddress;
                        }else return upgradePackgeAddress;
                    }else return upgradePackgeAddress;
                }else return upgradePackgeAddress;
            }else return upgradePackgeAddress;
        }else return upgradePackgeAddress;
    } else if (packageType == 80) {
        upgradePackgeAddress = await getUplineAddresses(address, 4);
        upgradePackgeAddressData = await users.findOne({
            address:upgradePackgeAddress
        })
        if (!(upgradePackgeAddress && upgradePackgeAddressData.packageBought.includes(packageType))) {
            upgradePackgeAddress = await getUplineAddresses(address, 5);
            upgradePackgeAddressData = await users.findOne({
                address:upgradePackgeAddress
            })
            if (!(upgradePackgeAddress && upgradePackgeAddressData.packageBought.includes(packageType))) {
                upgradePackgeAddress = await getUplineAddresses(address, 6);
                upgradePackgeAddressData = await users.findOne({
                    address:upgradePackgeAddress
                })
                if (!(upgradePackgeAddress && upgradePackgeAddressData.packageBought.includes(packageType))) {
                    upgradePackgeAddress = await getUplineAddresses(address, 7);
                    upgradePackgeAddressData = await users.findOne({
                        address:upgradePackgeAddress
                    })
                    if (!(upgradePackgeAddress && upgradePackgeAddressData.packageBought.includes(packageType))) {
                        upgradePackgeAddress = await getUplineAddresses(address, 8);
                        upgradePackgeAddressData = await users.findOne({
                            address:upgradePackgeAddress
                        })
                        if (!(upgradePackgeAddress && upgradePackgeAddressData.packageBought.includes(packageType))) {
                            upgradePackgeAddress = await getUplineAddresses(address, 9);
                            upgradePackgeAddressData = await users.findOne({
                                address:upgradePackgeAddress
                            })
                            if (!(upgradePackgeAddress && upgradePackgeAddressData.packageBought.includes(packageType))) {
                                upgradePackgeAddress = await getUplineAddresses(address, 10);
                                upgradePackgeAddressData = await users.findOne({
                                    address:upgradePackgeAddress
                                })
                                if (!(upgradePackgeAddress && upgradePackgeAddressData.packageBought.includes(packageType))) {
                                    upgradePackgeAddress = await getUplineAddresses(address, 11);
                                    upgradePackgeAddressData = await users.findOne({
                                        address:upgradePackgeAddress
                                    })
                                } else return upgradePackgeAddress;
                            } else return upgradePackgeAddress;
                        } else return upgradePackgeAddress;
                    } else return upgradePackgeAddress;
                } else return upgradePackgeAddress;
            } else return upgradePackgeAddress;
        } else return upgradePackgeAddress;
    } else if (packageType == 160) {
        upgradePackgeAddress = await getUplineAddresses(address, 5);
        upgradePackgeAddressData = await users.findOne({
            address:upgradePackgeAddress
        })
        if (!(upgradePackgeAddress && upgradePackgeAddressData.packageBought.includes(packageType))) {
            upgradePackgeAddress = await getUplineAddresses(address, 6);
            upgradePackgeAddressData = await users.findOne({
                address:upgradePackgeAddress
            })
            if (!(upgradePackgeAddress && upgradePackgeAddressData.packageBought.includes(packageType))) {
                upgradePackgeAddress = await getUplineAddresses(address, 7);
                upgradePackgeAddressData = await users.findOne({
                    address:upgradePackgeAddress
                })
                if (!(upgradePackgeAddress && upgradePackgeAddressData.packageBought.includes(packageType))) {
                    upgradePackgeAddress = await getUplineAddresses(address, 8);
                    upgradePackgeAddressData = await users.findOne({
                        address:upgradePackgeAddress
                    })
                    if (!(upgradePackgeAddress && upgradePackgeAddressData.packageBought.includes(packageType))) {
                        upgradePackgeAddress = await getUplineAddresses(address, 9);
                        upgradePackgeAddressData = await users.findOne({
                            address:upgradePackgeAddress
                        })
                        if (!(upgradePackgeAddress && upgradePackgeAddressData.packageBought.includes(packageType))) {
                            upgradePackgeAddress = await getUplineAddresses(address, 10);
                            upgradePackgeAddressData = await users.findOne({
                                address:upgradePackgeAddress
                            })
                            if (!(upgradePackgeAddress && upgradePackgeAddressData.packageBought.includes(packageType))) {
                                upgradePackgeAddress = await getUplineAddresses(address, 11);
                                upgradePackgeAddressData = await users.findOne({
                                    address:upgradePackgeAddress
                                })
                            } else return upgradePackgeAddress;
                        } else return upgradePackgeAddress;
                    } else return upgradePackgeAddress;
                } else return upgradePackgeAddress;
            } else return upgradePackgeAddress;
        } else return upgradePackgeAddress;
    } else if (packageType == 320) {
        upgradePackgeAddress = await getUplineAddresses(address, 6);
        upgradePackgeAddressData = await users.findOne({
            address:upgradePackgeAddress
        })
        if (!(upgradePackgeAddress && upgradePackgeAddressData.packageBought.includes(packageType))) {
            upgradePackgeAddress = await getUplineAddresses(address, 7);
            upgradePackgeAddressData = await users.findOne({
                upgradePackgeAddress
            })
            if (!(upgradePackgeAddress && upgradePackgeAddressData.packageBought.includes(packageType))) {
                upgradePackgeAddress = await getUplineAddresses(address, 8);
                upgradePackgeAddressData = await users.findOne({
                    upgradePackgeAddress
                })
                if (!(upgradePackgeAddress && upgradePackgeAddressData.packageBought.includes(packageType))) {
                    upgradePackgeAddress = await getUplineAddresses(address, 9);
                    upgradePackgeAddressData = await users.findOne({
                        upgradePackgeAddress
                    })
                    if (!(upgradePackgeAddress && upgradePackgeAddressData.packageBought.includes(packageType))) {
                        upgradePackgeAddress = await getUplineAddresses(address, 10);
                        upgradePackgeAddressData = await users.findOne({
                            upgradePackgeAddress
                        })
                        if (!(upgradePackgeAddress && upgradePackgeAddressData.packageBought.includes(packageType))) {
                            upgradePackgeAddress = await getUplineAddresses(address, 11);
                            upgradePackgeAddressData = await users.findOne({
                                address:upgradePackgeAddress
                            })
                        } else return upgradePackgeAddress;
                    } else return upgradePackgeAddress;
                } else return upgradePackgeAddress;
            } else return upgradePackgeAddress;
        } else return upgradePackgeAddress;
    } else if (packageType == 640) {
        upgradePackgeAddress = await getUplineAddresses(address, 7);
        upgradePackgeAddressData = await users.findOne({
            address:upgradePackgeAddress
        })
        if (!(upgradePackgeAddress && upgradePackgeAddressData.packageBought.includes(packageType))) {
            upgradePackgeAddress = await getUplineAddresses(address, 8);
            upgradePackgeAddressData = await users.findOne({
                address:upgradePackgeAddress
            })
            if (!(upgradePackgeAddress && upgradePackgeAddressData.packageBought.includes(packageType))) {
                upgradePackgeAddress = await getUplineAddresses(address, 9);
                upgradePackgeAddressData = await users.findOne({
                    address:upgradePackgeAddress
                })
                if (!(upgradePackgeAddress && upgradePackgeAddressData.packageBought.includes(packageType))) {
                    upgradePackgeAddress = await getUplineAddresses(address, 10);
                    upgradePackgeAddressData = await users.findOne({
                        address:upgradePackgeAddress
                    })
                    if (!(upgradePackgeAddress && upgradePackgeAddressData.packageBought.includes(packageType))) {
                        upgradePackgeAddress = await getUplineAddresses(address, 11);
                        upgradePackgeAddressData = await users.findOne({
                            address:upgradePackgeAddress
                        })
                    } else return upgradePackgeAddress;     
                } else return upgradePackgeAddress;
            } else return upgradePackgeAddress;
        } else return upgradePackgeAddress;
    } else if (packageType == 1280) {
        upgradePackgeAddress = await getUplineAddresses(address, 8);
        upgradePackgeAddressData = await users.findOne({
            address:upgradePackgeAddress
        })
        if (!(upgradePackgeAddress && upgradePackgeAddressData.packageBought.includes(packageType))) {
            upgradePackgeAddress = await getUplineAddresses(address, 9);
            upgradePackgeAddressData = await users.findOne({
                address:upgradePackgeAddress
            })
            if (!(upgradePackgeAddress && upgradePackgeAddressData.packageBought.includes(packageType))) {
                upgradePackgeAddress = await getUplineAddresses(address, 10);
                upgradePackgeAddressData = await users.findOne({
                    address:upgradePackgeAddress
                })
                if (!(upgradePackgeAddress && upgradePackgeAddressData.packageBought.includes(packageType))) {
                    upgradePackgeAddress = await getUplineAddresses(address, 11);
                    upgradePackgeAddressData = await users.findOne({
                        address:upgradePackgeAddress
                    })
                } else return upgradePackgeAddress;
            } else return upgradePackgeAddress;
        } else return upgradePackgeAddress;
    } else if (packageType == 2560) {
        upgradePackgeAddress = await getUplineAddresses(address, 10);
        upgradePackgeAddressData = await users.findOne({
            address:upgradePackgeAddress
        })
        if (!(upgradePackgeAddress && upgradePackgeAddressData.packageBought.includes(packageType))) {
            upgradePackgeAddress = await getUplineAddresses(address, 11);
            upgradePackgeAddressData = await users.findOne({
                address:upgradePackgeAddress
            })
        } else return upgradePackgeAddress;
    } else if (packageType == 5120) {
        upgradePackgeAddress = await getUplineAddresses(address, 11);
        upgradePackgeAddressData = await users.findOne({
            address:upgradePackgeAddress
        })
    }

    else return upgradePackgeAddress;
}

async function getUplineAddresses (address,  maxLevel,currentLevel = 1) {
    console.log("address",address);
    const userData = await users.findOne({address});
    if(userData){
        let uplineAddresses;
        if (!userData.parentAddress) {
            uplineAddresses=process.env.admin_address;
            return uplineAddresses;
        }
        // Check if the maximum level is reached
        if (currentLevel == maxLevel) {
            uplineAddresses=userData.parentAddress
            return uplineAddresses;
        }
        console.log("uplineAddresses",uplineAddresses);
        // Recursively traverse up to the parent node
        return getUplineAddresses(userData.parentAddress,  maxLevel,currentLevel + 1);
    }
    
}

// exports={getAddress}