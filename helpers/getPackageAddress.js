import users from '../models/users'
export const getAddress = async () => {
    let upgradePackgeAddress;
    let upgradePackgeAddressData;
    if (packageType == '20') {
        upgradePackgeAddress = await getUplineAddresses(address, 2);
        upgradePackgeAddressData = await users.findOne({
            upgradePackgeAddress
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