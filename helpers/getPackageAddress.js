import users from '../models/users'
export const getAddress = async (packageType,address) => {
    let upgradePackgeAddress;
    let upgradePackgeAddressData;
    if (packageType == '20') {
        upgradePackgeAddress = await getUplineAddresses(address, 2);
        upgradePackgeAddressData = await users.findOne({
            address:upgradePackgeAddress
        })
        if (!(upgradePackgeAddress && upgradePackgeAddressData.packageBought.includes(packageType))) {
            upgradePackgeAddress = await getUplineAddresses(address, 3);
            upgradePackgeAddressData = await users.findOne({
                upgradePackgeAddress
            })
            if (!(upgradePackgeAddress && upgradePackgeAddressData.packageBought.includes(packageType))) {
                upgradePackgeAddress = await getUplineAddresses(address, 4);
                upgradePackgeAddressData = await users.findOne({
                    upgradePackgeAddress
                })
                if (!(upgradePackgeAddress && upgradePackgeAddressData.packageBought.includes(packageType))) {
                    upgradePackgeAddress = await getUplineAddresses(address, 5);
                    upgradePackgeAddressData = await users.findOne({
                        upgradePackgeAddress
                    })
                    if (!(upgradePackgeAddress && upgradePackgeAddressData.packageBought.includes(packageType))) {
                        upgradePackgeAddress = await getUplineAddresses(address, 6);
                        upgradePackgeAddressData = await users.findOne({
                            upgradePackgeAddress
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
                                                upgradePackgeAddress
                                            })
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

    } else if (packageType == '30') {
        upgradePackgeAddress = await getUplineAddresses(address, 3);
        upgradePackgeAddressData = await users.findOne({
            upgradePackgeAddress
        })
        if (!(upgradePackgeAddress && upgradePackgeAddressData.packageBought.includes(packageType))) {
            upgradePackgeAddress = await getUplineAddresses(address, 4);
            upgradePackgeAddressData = await users.findOne({
                upgradePackgeAddress
            })
            if (!(upgradePackgeAddress && upgradePackgeAddressData.packageBought.includes(packageType))) {
                upgradePackgeAddress = await getUplineAddresses(address, 5);
                upgradePackgeAddressData = await users.findOne({
                    upgradePackgeAddress
                })
                if (!(upgradePackgeAddress && upgradePackgeAddressData.packageBought.includes(packageType))) {
                    upgradePackgeAddress = await getUplineAddresses(address, 6);
                    upgradePackgeAddressData = await users.findOne({
                        upgradePackgeAddress
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
                                            upgradePackgeAddress
                                        })
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    } else if (packageType == '80') {
        upgradePackgeAddress = await getUplineAddresses(address, 4);
        upgradePackgeAddressData = await users.findOne({
            upgradePackgeAddress
        })
        if (!(upgradePackgeAddress && upgradePackgeAddressData.packageBought.includes(packageType))) {
            upgradePackgeAddress = await getUplineAddresses(address, 5);
            upgradePackgeAddressData = await users.findOne({
                upgradePackgeAddress
            })
            if (!(upgradePackgeAddress && upgradePackgeAddressData.packageBought.includes(packageType))) {
                upgradePackgeAddress = await getUplineAddresses(address, 6);
                upgradePackgeAddressData = await users.findOne({
                    upgradePackgeAddress
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
                                        upgradePackgeAddress
                                    })
                                }
                            }
                        }
                    }
                }
            }
        }
    } else if (packageType == '160') {
        upgradePackgeAddress = await getUplineAddresses(address, 5);
        upgradePackgeAddressData = await users.findOne({
            upgradePackgeAddress
        })
        if (!(upgradePackgeAddress && upgradePackgeAddressData.packageBought.includes(packageType))) {
            upgradePackgeAddress = await getUplineAddresses(address, 6);
            upgradePackgeAddressData = await users.findOne({
                upgradePackgeAddress
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
                                    upgradePackgeAddress
                                })
                            }
                        }
                    }
                }
            }
        }
    } else if (packageType == '320') {
        upgradePackgeAddress = await getUplineAddresses(address, 6);
        upgradePackgeAddressData = await users.findOne({
            upgradePackgeAddress
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
                                upgradePackgeAddress
                            })
                        }
                    }
                }
            }
        }
    } else if (packageType == '640') {
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
                            upgradePackgeAddress
                        })
                    }
                }
            }
        }
    } else if (packageType == '1280') {
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
                        upgradePackgeAddress
                    })
                }
            }
        }
    } else if (packageType == '2560') {
        upgradePackgeAddress = await getUplineAddresses(address, 10);
        upgradePackgeAddressData = await users.findOne({
            upgradePackgeAddress
        })
        if (!(upgradePackgeAddress && upgradePackgeAddressData.packageBought.includes(packageType))) {
            upgradePackgeAddress = await getUplineAddresses(address, 11);
            upgradePackgeAddressData = await users.findOne({
                upgradePackgeAddress
            })
        }
    } else if (packageType == '5120') {
        upgradePackgeAddress = await getUplineAddresses(address, 11);
        upgradePackgeAddressData = await users.findOne({
            upgradePackgeAddress
        })
    }
}

async function getUplineAddresses (address, currentLevel = 1, maxLevel) {
    const userData = await users.findOne({address});
    let uplineAddresses;
    if (!userData.referBy) {
        return uplineAddresses;
    }
    // Check if the maximum level is reached
    if (currentLevel === maxLevel) {
        uplineAddresses.push(userData.referBy)
        return uplineAddresses;
    }
    // Recursively traverse up to the parent node
    return getUplineAddresses(userData.referBy, uplineAddresses, currentLevel + 1, maxLevel);
}